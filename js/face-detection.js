/* ============================================
   Face Detection System with Real Face Recognition
   Using face-api.js for accurate face comparison
   ============================================ */

class FaceRecognitionSystem {
    constructor() {
        this.isCameraActive = false;
        this.isLessonStarted = false;
        this.isLessonCompleted = false;
        this.stream = null;
        this.faceDetectionInterval = null;
        this.lastFaceDetectedTime = 0;
        this.faceDetectionCount = 0;
        this.referenceFaceDescriptor = null;
        this.modelsLoaded = false;
        this.isProcessingFrame = false;
        
        this.consecutiveMatches = 0;
        this.consecutiveMismatches = 0;
        this.requiredConsecutiveMatches = 3; 
        
        this.verificationState = 'initializing'; // 'initializing', 'no-face', 'wrong-face', 'verified'
        this.consecutiveNoFace = 0; // Add this line
        this.requiredConsecutiveNoFace = 2; // Add this line - require 2 consecutive no-face detections
        
        this.isStudentVerified = false;
        this.isQuizEnabled = true;
        this.verificationTimeout = null;
        this.lastVerificationTime = null;
        
        this.isLoading = true;
        this.loadingProgress = 0;
        this.loadingSteps = {
            camera: false,
            verification: false,
            models: false,
            lesson: false
        };

        this.init();
    }
    
    async init() {
        this.cacheElements();
        this.bindEvents();

        // Show loading screen immediately
        this.showLoadingScreen();
        
        // Start loading sequence
        await this.startLoadingSequence();
        
        // Only set up lesson monitoring after loading completes
        this.setupLessonMonitoring();

        // Load face recognition models
        await this.loadFaceRecognitionModels();
        
        // Extract features from reference photo
        await this.extractReferenceFaceFeatures();        
        
        // Check saved quiz state
        this.checkQuizState();
    }

    async startLoadingSequence() {
        try {
            // Step 1: Load AI Models
            await this.updateLoadingStep('models', 'Loading AI models...');
            await this.loadFaceRecognitionModels();
            await this.completeLoadingStep('models');
            
            // Step 2: Extract reference face
            await this.updateLoadingStep('verification', 'Preparing face verification...');
            await this.extractReferenceFaceFeatures();
            await this.completeLoadingStep('verification');
            
            // Step 3: Load lesson
            await this.updateLoadingStep('lesson', 'Loading lesson content...');
            await this.completeLoadingStep('lesson');
            
            // Step 4: Start camera
            await this.updateLoadingStep('camera', 'Starting camera for verification...');
            await this.startCamera();
            await this.completeLoadingStep('camera');
            
            // All steps completed
            setTimeout(() => {
                this.hideLoadingScreen();
                                
            }, 1000);
            
        } catch (error) {
            console.error('Loading sequence error:', error);
            this.handleLoadingError(error);
        }
    }

    cacheElements() {
        this.bubbleToggle = document.getElementById('bubbleToggle');
        this.bubbleContainer = document.getElementById('bubbleContainer');
        this.bubbleStatus = document.getElementById('bubbleStatus');
        this.faceVideo = document.getElementById('faceVideo');
        this.faceCanvas = document.getElementById('faceCanvas');
        this.videoOverlay = document.getElementById('videoOverlay');
        this.cameraStatus = document.getElementById('cameraStatus');
        this.faceMatchStatus = document.getElementById('faceMatchStatus');
        this.faceMatchText = document.getElementById('faceMatchText');
        this.startCameraBtn = document.getElementById('startCameraBtn');
        this.stopCameraBtn = document.getElementById('stopCameraBtn');
        this.referenceImg = document.getElementById('referenceImg');
        this.cameraPermissionPrompt = document.getElementById('cameraPermissionPrompt');
        this.allowCameraBtn = document.getElementById('allowCameraBtn');
        this.denyCameraBtn = document.getElementById('denyCameraBtn');
        
        // Create additional canvas for face processing
        this.processingCanvas = document.createElement('canvas');
        this.processingContext = this.processingCanvas.getContext('2d');
        
        // Loading screen elements
        this.loadingScreen = document.getElementById('loadingScreen');
        this.loadingMessage = document.getElementById('loadingMessage');
        this.loadingProgress = document.getElementById('loadingProgress');
        
        // Loading step elements
        this.stepModels = document.getElementById('stepModels');
        this.stepCamera = document.getElementById('stepCamera');
        this.stepVerification = document.getElementById('stepVerification');
        this.stepLesson = document.getElementById('stepLesson');
    }
    
    bindEvents() {
        // Toggle bubble
        this.bubbleToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleBubble();
        });
                
        // Camera permission
        this.allowCameraBtn.addEventListener('click', () => this.requestCameraPermission());
        this.denyCameraBtn.addEventListener('click', () => this.hidePermissionPrompt());
        
        // Close bubble when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.bubbleContainer.contains(e.target) && 
                !this.bubbleToggle.contains(e.target) && 
                this.bubbleContainer.classList.contains('active')) {
                this.hideBubble();
            }
        });
        
        // Handle reference image load
        if (this.referenceImg.complete) {
            this.extractReferenceFaceFeatures();
        } else {
            this.referenceImg.addEventListener('load', () => {
                this.extractReferenceFaceFeatures();
            });
        }

    }

        showLoadingScreen() {
        if (this.loadingScreen) {
            this.loadingScreen.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }
    
    hideLoadingScreen() {
        if (this.loadingScreen) {
            this.loadingScreen.style.display = 'none';
            document.body.style.overflow = '';
        }
    }
    
    async updateLoadingStep(step, message) {
        this.loadingSteps[step] = 'loading';
        
        // Update UI
        const stepElement = this[`step${step.charAt(0).toUpperCase() + step.slice(1)}`];
        if (stepElement) {
            stepElement.classList.remove('completed', 'failed');
            stepElement.classList.add('active');
        }
        
        // Update message
        if (this.loadingMessage) {
            this.loadingMessage.textContent = message;
        }
        
        // Update progress bar
        this.updateProgressBar();
    }
    
    async completeLoadingStep(step) {
        this.loadingSteps[step] = 'completed';
        
        const stepElement = this[`step${step.charAt(0).toUpperCase() + step.slice(1)}`];
        if (stepElement) {
            stepElement.classList.remove('active');
            stepElement.classList.add('completed');
        }
        
        // Update progress bar
        this.updateProgressBar();
        
        // Small delay between steps for better UX
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    updateProgressBar() {
        const completedSteps = Object.values(this.loadingSteps).filter(
            status => status === 'completed'
        ).length;
        const totalSteps = Object.keys(this.loadingSteps).length;
        const progress = (completedSteps / totalSteps) * 100;
        
        if (this.loadingProgress) {
            this.loadingProgress.style.width = `${progress}%`;
        }
    }
    
    handleLoadingError(error) {
        console.error('Loading error:', error);
        
        // Update error message
        if (this.loadingMessage) {
            this.loadingMessage.textContent = 'Setup failed. Please refresh the page.';
            this.loadingMessage.style.color = '#ef4444';
        }
        
    }
        
    
    startLesson() {
        // Enable quiz
        this.enableQuiz();
        
        // Dispatch lesson started event
        const event = new CustomEvent('lessonStarted', {
            detail: { timestamp: new Date().toISOString() }
        });
        document.dispatchEvent(event);
        
        // Update UI to show lesson is ready
        this.showNotification('Lesson is ready! You can now start answering questions.', 'success');
    }
    
    async loadFaceRecognitionModels() {
        try {
            console.log('Loading face recognition models...');
            
            // Set model loading progress
            this.faceMatchText.textContent = 'Loading face models...';
            
            // Define the model path - adjust based on your server structure
            const MODEL_URL = '../../assets/models/';
            
            // Load all required models
            await Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
                faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL)
            ]);
            
            this.modelsLoaded = true;
            console.log('Face recognition models loaded successfully');
            this.faceMatchText.textContent = 'Models loaded. Ready to start camera.';
            
        } catch (error) {
            console.error('Error loading face recognition models:', error);
            this.faceMatchText.textContent = 'Model loading failed';
            this.showNotification('Face recognition models failed to load. Using basic detection.', 'error');
        }
    }
    
    async extractReferenceFaceFeatures() {
        if (!this.modelsLoaded) {
            console.log('Models not loaded yet, skipping reference extraction');
            return;
        }
        
        try {
            console.log('Extracting reference face features...');
            
            // Use multiple detection methods for better accuracy
            const detectionOptions = new faceapi.TinyFaceDetectorOptions({
                inputSize: 512,
                scoreThreshold: 0.5
            });
            
            // Detect face in reference image
            const detections = await faceapi
                .detectSingleFace(this.referenceImg, detectionOptions)
                .withFaceLandmarks()
                .withFaceDescriptor();
            
            if (detections) {
                this.referenceFaceDescriptor = detections.descriptor;
                console.log('Reference face features extracted successfully');
                console.log('Descriptor length:', this.referenceFaceDescriptor.length);
                
                // Update UI to show reference is ready
                this.referenceImg.style.borderColor = 'var(--green)';
                this.showNotification('Reference photo loaded successfully', 'success');
                
            } else {
                console.warn('No face detected in reference photo');
                this.referenceImg.style.borderColor = '#ef4444';
                this.showNotification('No face detected in reference photo. Please use a clear face photo.', 'warning');
            }
            
        } catch (error) {
            console.error('Error extracting reference face features:', error);
            this.referenceImg.style.borderColor = '#ef4444';
        }
    }
    
    toggleBubble() {
        this.bubbleContainer.classList.toggle('active');
    }
    
    hideBubble() {
        this.bubbleContainer.classList.remove('active');
    }
    
    async startCamera() {
        if (this.isCameraActive) return;
        
        // Check if models are loaded
        if (!this.modelsLoaded) {
            this.showNotification('Face models are still loading. Please wait...', 'warning');
            return;
        }
        
        // Check permission
        if (!this.hasCameraPermission()) {
            this.showPermissionPrompt();
            return;
        }
        
        try {
            // Get camera stream
            this.stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: 'user',
                    width: { ideal: 640 },
                    height: { ideal: 480 }
                },
                audio: false
            });
            
            // Set up video element
            this.faceVideo.srcObject = this.stream;
            
            // Wait for video to be ready
            await new Promise((resolve) => {
                this.faceVideo.onloadedmetadata = () => {
                    this.videoOverlay.style.display = 'none';
                    this.isCameraActive = true;
                    resolve();
                };
            });
            
            // Set canvas dimensions
            this.faceCanvas.width = this.faceVideo.videoWidth;
            this.faceCanvas.height = this.faceVideo.videoHeight;
            this.processingCanvas.width = this.faceVideo.videoWidth;
            this.processingCanvas.height = this.faceVideo.videoHeight;
            
            // Update UI
            this.updateCameraUI(true);
            
            // Start face recognition
            this.startFaceRecognition();
            
            console.log('Camera started successfully');
            
            // After camera starts successfully
            if (this.isCameraActive) {
                // Start face recognition
                this.startFaceRecognition();
                
                // Set timeout for verification
                this.startVerificationTimeout();
            }
            

        } catch (error) {
            console.error('Error starting camera:', error);
            
            // Mark camera step as failed
            this.stepCamera?.classList.remove('active');
            this.stepCamera?.classList.add('failed');
            
        }
        
    }
    
    startVerificationTimeout() {
        // Give user time to verify before allowing quiz
        setTimeout(() => {
            if (!this.isStudentVerified && this.isCameraActive) {
                this.showNotification('Please position your face for verification', 'warning');
            }
        }, 3000);
        
    }
    
    hasCameraPermission() {
        return localStorage.getItem('cameraPermissionGranted') === 'true';
    }
    
    showPermissionPrompt() {
        this.cameraPermissionPrompt.style.display = 'flex';
    }
    
    hidePermissionPrompt() {
        this.cameraPermissionPrompt.style.display = 'none';
    }
    
    requestCameraPermission() {
        this.hidePermissionPrompt();
        localStorage.setItem('cameraPermissionGranted', 'true');
        this.startCamera();
    }
    
    updateCameraUI(isActive) {
        if (isActive) {
            this.cameraStatus.textContent = 'Active';
            this.cameraStatus.classList.remove('inactive');
            this.cameraStatus.classList.add('active');
            this.bubbleToggle.classList.add('camera-active');
            this.bubbleStatus.classList.add('active');
            this.videoOverlay.style.display = 'none';
                        
            // Show initial status
            this.faceMatchStatus.className = 'face-match-status verifying';
            this.faceMatchText.textContent = 'Checking for face...';
            
        } else {
            this.cameraStatus.textContent = 'Inactive';
            this.cameraStatus.classList.remove('active');
            this.cameraStatus.classList.add('inactive');
            this.bubbleToggle.classList.remove('camera-active');
            this.bubbleStatus.classList.remove('active');
            this.videoOverlay.style.display = 'flex';
            
            // Update buttons
            this.startCameraBtn.disabled = false;
            this.startCameraBtn.innerHTML = '<i class="fas fa-play"></i> Start Camera';
            this.stopCameraBtn.disabled = true;
            
            // Reset status
            this.faceMatchStatus.className = 'face-match-status';
            this.faceMatchText.textContent = 'Camera ready';
        }
    }
    
    startFaceRecognition() {
        if (!this.isCameraActive || !this.modelsLoaded) return;
        
        console.log('Starting face recognition...');
        
        // Clear any existing interval
        this.stopFaceRecognition();
        
        // Start new recognition interval
        this.faceDetectionInterval = setInterval(async () => {
            if (!this.isCameraActive || !this.stream || this.isProcessingFrame) {
                return;
            }
            
            try {
                this.isProcessingFrame = true;
                await this.processVideoFrame();
            } catch (error) {
                console.error('Error processing video frame:', error);
            } finally {
                this.isProcessingFrame = false;
            }
        }, 3000); // Process every second
    }
    
    async processVideoFrame() {
        // Draw current video frame to canvas
        const context = this.faceCanvas.getContext('2d');
        context.drawImage(this.faceVideo, 0, 0, this.faceCanvas.width, this.faceCanvas.height);
        
        // Also draw to processing canvas
        this.processingContext.drawImage(this.faceVideo, 0, 0, this.processingCanvas.width, this.processingCanvas.height);
        
        // Detect faces in current frame
        const detections = await this.detectFaces();
        
        if (detections && detections.length > 0) {
            this.lastFaceDetectedTime = Date.now();
            this.faceDetectionCount++;
            
            // Get the largest face (most likely the main person)
            const mainFace = detections.reduce((prev, current) => 
                prev.detection.box.area > current.detection.box.area ? prev : current
            );
            
            // Check if face matches reference
            const isMatch = await this.compareFaceWithReference(mainFace.descriptor);
            
            if (isMatch) {
                this.consecutiveMatches++;
                this.consecutiveMismatches = 0;
                this.consecutiveNoFace = 0; // Reset no-face counter
                this.verificationState = 'verifying'; // Update state
                
                // Only verify after required consecutive matches
                if (this.consecutiveMatches >= this.requiredConsecutiveMatches) {
                    this.verificationState = 'verified';
                    this.updateVerificationStatus(true, 'Student verified ✓');
                    this.dispatchVerificationEvent(true);
                } else {
                    this.updateVerificationStatus('matching', `Verifying... (${this.consecutiveMatches}/${this.requiredConsecutiveMatches})`);
                }
            } else {
                this.consecutiveMismatches++;
                this.consecutiveMatches = 0;
                this.consecutiveNoFace = 0; // Reset no-face counter
                this.verificationState = 'wrong-face'; // Update state
                
                if (this.consecutiveMismatches >= 2) {
                    this.updateVerificationStatus(false, 'You are not student');
                    this.dispatchVerificationEvent(false);
                    this.disableQuiz('wrong-face'); // Pass state to disableQuiz
                } else {
                    this.updateVerificationStatus('checking', 'Checking face...');
                }
            }
            
        } else {
            // NO FACE DETECTED CASE - This was missing!
            this.consecutiveNoFace = (this.consecutiveNoFace || 0) + 1;
            this.consecutiveMatches = 0;
            this.consecutiveMismatches = 0;
            this.verificationState = 'no-face'; // Update state
            
            if (this.consecutiveNoFace >= 2) {
                this.updateVerificationStatus('no-face', 'No face detected');
                this.disableQuiz('no-face'); // Pass state to disableQuiz
                this.dispatchVerificationEvent(false);
            } else {
                this.updateVerificationStatus('no-face', 'No face detected');
            }
        }
    }

    async detectFaces() {
        if (!this.modelsLoaded) return null;
        
        try {
            // Use multiple detection options for better accuracy
            const detectionOptions = new faceapi.TinyFaceDetectorOptions({
                inputSize: 320,
                scoreThreshold: 0.3
            });
            
            // Detect faces with landmarks and descriptors
            const detections = await faceapi
                .detectAllFaces(this.faceCanvas, detectionOptions)
                .withFaceLandmarks()
                .withFaceDescriptors();
            
            return detections;
            
        } catch (error) {
            console.error('Face detection error:', error);
            return null;
        }
    }
    
    async compareFaceWithReference(currentDescriptor) {
        if (!this.referenceFaceDescriptor) {
            console.log('No reference face descriptor available');
            return false;
        }
        
        try {
            const distance = faceapi.euclideanDistance(
                this.referenceFaceDescriptor, 
                currentDescriptor
            );
            
            console.log(`Face distance: ${distance.toFixed(4)}`);
            
            const similarityThreshold = 0.5;
            const isMatch = distance < similarityThreshold;
            
            // Store match result
            this.lastMatchResult = isMatch;
            this.lastMatchDistance = distance;
            this.lastVerificationTime = new Date();
            
            if (isMatch) {
                this.consecutiveMatches++;
                this.consecutiveMismatches = 0;
                this.consecutiveNoFace = 0; // Reset no-face counter
                this.verificationState = 'verifying';
                
                console.log(`Consecutive matches: ${this.consecutiveMatches}/${this.requiredConsecutiveMatches}`);
                
                if (this.consecutiveMatches >= this.requiredConsecutiveMatches) {
                    // Student verified!
                    this.verificationState = 'verified';
                    this.updateVerificationStatus(true, 'Student verified ✓');
                    this.dispatchVerificationEvent(true);
                    
                    // Only enable quiz if it's not already enabled
                    if (!this.isQuizEnabled) {
                        console.log('First time verification - enabling quiz');
                        this.enableQuiz();
                        
                        // Dispatch event with fromVerification flag for lesson.js
                        const event = new CustomEvent('quizStateChange', {
                            detail: { 
                                enabled: true, 
                                fromVerification: true,
                                firstTime: !this.quizWasEverEnabled
                            }
                        });
                        document.dispatchEvent(event);
                        
                        this.quizWasEverEnabled = true;
                    } else {
                        console.log('Quiz already enabled, just updating verification status');
                    }
                    
                    // Slow down checking frequency after successful verification
                    if (this.faceDetectionInterval) {
                        clearInterval(this.faceDetectionInterval);
                        // Check less frequently after verification
                        this.faceDetectionInterval = setInterval(async () => {
                            if (!this.isProcessingFrame) {
                                await this.processVideoFrame();
                            }
                        }, 3000); 
                        console.log('Reduced face check frequency to 3 seconds');
                    }
                    
                    // If we just finished loading, show notification
                    if (this.justFinishedLoading) {
                        this.showNotification('Student verified! Quiz is now enabled.', 'success');
                        this.justFinishedLoading = false;
                    }
                    
                } else {
                    // Still counting consecutive matches
                    this.updateVerificationStatus('matching', 
                        `Verifying... (${this.consecutiveMatches}/${this.requiredConsecutiveMatches})`);
                }
                
            } else {
                // Face doesn't match
                this.consecutiveMismatches++;
                this.consecutiveMatches = 0;
                this.consecutiveNoFace = 0; // Reset no-face counter
                this.verificationState = 'wrong-face';
                
                console.log(`Consecutive mismatches: ${this.consecutiveMismatches}`);
                
                if (this.consecutiveMismatches >= 2) {
                    // Not student - disable quiz
                    if (this.isQuizEnabled) {
                        console.log('Multiple mismatches - disabling quiz');
                        this.disableQuiz('wrong-face');
                        
                        // Dispatch event for lesson.js
                        const event = new CustomEvent('quizStateChange', {
                            detail: { enabled: false, fromVerification: false }
                        });
                        document.dispatchEvent(event);
                    }
                    
                    this.updateVerificationStatus('wrong-face', 'Face does not match');
                    this.dispatchVerificationEvent(false);
                    
                } else {
                    // First mismatch, just warn
                    this.updateVerificationStatus('checking', 'Face checking...');
                }
            }
            
            return isMatch;
            
        } catch (error) {
            console.error('Face comparison error:', error);
            return false;
        }
    }
    
    updateVerificationStatus(status, message) {
        // Clear all status classes
        this.faceMatchStatus.classList.remove('matched', 'unmatched', 'verifying', 'checking', 'no-face', 'wrong-face');
        
        // Add appropriate class and update text
        if (status === true) { // Verified
            this.faceMatchStatus.classList.add('matched');
            this.faceMatchText.textContent = message;
            this.showMatchOverlay(true);
            
            // Dispatch quiz state change event
            const enableEvent = new CustomEvent('quizStateChange', {
                detail: { enabled: true }
            });
            document.dispatchEvent(enableEvent);
            
        } else if (status === false) { // Not student (generic)
            this.faceMatchStatus.classList.add('unmatched');
            this.faceMatchText.textContent = message;
            this.showMatchOverlay(false);
            
            // Dispatch quiz state change event
            const disableEvent = new CustomEvent('quizStateChange', {
                detail: { enabled: false }
            });
            document.dispatchEvent(disableEvent);
            
        } else if (status === 'matching') {
            this.faceMatchStatus.classList.add('verifying');
            this.faceMatchText.textContent = message;
            
        } else if (status === 'checking') {
            this.faceMatchStatus.classList.add('checking');
            this.faceMatchText.textContent = message;
            
        } else if (status === 'no-face') {
            this.faceMatchStatus.classList.add('no-face');
            this.faceMatchText.textContent = message;
            
        } else if (status === 'wrong-face') {
            this.faceMatchStatus.classList.add('wrong-face');
            this.faceMatchText.textContent = message;
            
        } else {
            this.faceMatchText.textContent = message;
        }
    }
    
    showMatchOverlay(isMatch) {
        // Create or update overlay on video
        let overlay = this.faceVideo.parentElement.querySelector('.match-overlay');
        
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'match-overlay';
            this.faceVideo.parentElement.appendChild(overlay);
        }
        
        overlay.style.display = 'block';
        overlay.innerHTML = isMatch 
            ? '<i class="fas fa-check-circle"></i>'
            : '<i class="fas fa-times-circle"></i>';
        overlay.className = `match-overlay ${isMatch ? 'match-success' : 'match-fail'}`;
        
        // Hide overlay after 3 seconds
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 3000);
    }
    
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `face-recognition-notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'error' ? 'exclamation-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Add to bubble container
        this.bubbleContainer.appendChild(notification);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
    
    dispatchVerificationEvent(isVerified) {
        const event = new CustomEvent('faceVerification', {
            detail: {
                timestamp: new Date().toISOString(),
                verified: isVerified,
                count: this.faceDetectionCount
            }
        });
        document.dispatchEvent(event);
        
        // Also log to console for debugging
        console.log(`Face verification: ${isVerified ? 'STUDENT VERIFIED' : 'NOT THE STUDENT'}`);
    }
    
    stopFaceRecognition() {
        if (this.faceDetectionInterval) {
            clearInterval(this.faceDetectionInterval);
            this.faceDetectionInterval = null;
        }
    }
    
    stopCamera() {
        if (!this.isCameraActive) return;
        
        // Stop face recognition
        this.stopFaceRecognition();
        
        // Stop camera stream
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;
        }
        
        // Clear video
        this.faceVideo.srcObject = null;
        this.isCameraActive = false;
        
        // Update UI
        this.updateCameraUI(false);
        
        console.log('Camera stopped');
        
        // Check if we need to disable quiz when camera stops during lesson
        if (!this.isLessonCompleted && !this.isStudentVerified) {
            setTimeout(() => {
                if (!this.isCameraActive && !this.isStudentVerified) {
                    this.disableQuiz();
                }
            }, 3000); // Give 5 seconds before disabling
        }
    }

    showCameraError() {
        this.faceMatchStatus.className = 'face-match-status';
        this.faceMatchText.textContent = 'Camera error';
        this.videoOverlay.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            <span>Camera unavailable</span>
        `;
        this.videoOverlay.style.display = 'flex';
    }
    
    setupQuizMonitoring() {
        // Monitor quiz state changes
        const quizContainer = document.querySelector('.question-container');
        if (quizContainer) {
            this.quizContainer = quizContainer;
        }
        
        // Add verification state listener
        document.addEventListener('quizStateChange', (e) => {
            if (e.detail && e.detail.enabled === false) {
                this.disableQuiz();
            } else {
                this.enableQuiz();
            }
        });
    }

    setupLessonMonitoring() {
        // Auto-start camera when lesson begins
        const checkLessonStart = setInterval(() => {
            const firstQuestion = document.querySelector('.question-card.active');
            if (firstQuestion && !this.isCameraActive) {
                this.isLessonStarted = true;
                clearInterval(checkLessonStart);
                
                // Auto-start camera after 2 seconds
                setTimeout(() => {
                    if (!this.isCameraActive && !this.isLessonCompleted) {
                        this.startCamera();
                    }
                }, 2000);
            }
        }, 1000);
        
        // Monitor lesson progress
        this.setupProgressMonitoring();
        
        // Monitor lesson completion
        this.setupCompletionMonitoring();

        this.setupQuizMonitoring(); 

    }
    
    setupProgressMonitoring() {
        // Watch for question changes
        const progressBar = document.getElementById('lessonProgress');
        
        if (progressBar) {
            const observer = new MutationObserver(() => {
                if (!this.isCameraActive && !this.isLessonCompleted) {
                    // Try to restart camera if it stopped unexpectedly
                    setTimeout(() => this.startCamera(), 1000);
                }
            });
            
            observer.observe(progressBar, { attributes: true, attributeFilter: ['style'] });
        }
    }
    
    setupCompletionMonitoring() {
        // Watch for completion screen
        const completionScreen = document.getElementById('completionScreen');
        if (completionScreen) {
            const observer = new MutationObserver(() => {
                if (completionScreen.style.display === 'flex') {
                    this.isLessonCompleted = true;
                    this.stopCamera();
                    this.faceMatchText.textContent = 'Lesson completed!';
                    observer.disconnect();
                }
            });
            
            observer.observe(completionScreen, { attributes: true, attributeFilter: ['style'] });
        }
        
        // Also listen for custom lesson completed event
        document.addEventListener('lessonCompleted', () => {
            this.isLessonCompleted = true;
            this.stopCamera();
        });
    }


    disableQuiz(reason = 'unknown') {
        if (!this.isQuizEnabled) return;
        
        console.log(`Disabling quiz due to: ${reason}`);
        this.isQuizEnabled = false;
        
        // Add disabled class to body
        document.body.classList.add('quiz-disabled');
        
        // Show dark overlay
        const darkOverlay = document.getElementById('darkOverlay');
        const blockedScreen = document.getElementById('verificationBlockedScreen');
        
        if (darkOverlay) darkOverlay.style.display = 'block';
        if (blockedScreen) {
            blockedScreen.style.display = 'block';
            
            // Clear all existing classes
            blockedScreen.className = 'verification-blocked-screen';
            
            // Handle NO-FACE case
            if (reason === 'no-face') {
                blockedScreen.classList.add('no-face');
                blockedScreen.innerHTML = `
                    <i class="fas fa-user-slash"></i>
                    <h2>No Student Detected</h2>
                    <p>Please position yourself in front of the camera to continue.</p>
                    <hr class="separator-line">
                    <p2>Make sure your face is clearly visible to the camera.</p2>
                `;
            } 
            // Handle WRONG-FACE case
            else if (reason === 'wrong-face') {
                blockedScreen.classList.add('wrong-face');
                blockedScreen.innerHTML = `
                    <i class="fas fa-user-lock"></i>
                    <h2>Unauthorized User Detected</h2>
                    <p>The system detected that you are not the registered student for this account. The quiz has been disabled.</p>
                    <hr class="separator-line">
                    <p2>Please switch back to the verified student to continue.</p2>
                `;
            } 
            // Handle DEFAULT/UNKNOWN case
            else {
                // Use wrong-face as default for any other reason
                blockedScreen.classList.add('wrong-face');
                blockedScreen.innerHTML = `
                    <i class="fas fa-user-lock"></i>
                    <h2>Unauthorized User Detected</h2>
                    <p>The system detected that you are not the registered student for this account. The quiz has been disabled.</p>
                    <hr class="separator-line">
                    <p2>Please switch back to the verified student to continue.</p2>
                `;
            }
        }
        
        // Update bubble status
        this.updateBubbleStatus();
        
        // Add warning state to camera bubble
        const bubble = document.querySelector('.face-recognition-bubble');
        if (bubble) bubble.classList.add('warning');
        
        // Store current state
        this.storeQuizState(false);
        
        // Show appropriate notification based on reason
        if (reason === 'no-face') {
            this.showNotification('No face detected. Quiz disabled.', 'error');
        } else if (reason === 'wrong-face') {
            this.showNotification('Unauthorized user. Quiz disabled.', 'error');
        } else {
            this.showNotification('Quiz disabled - Verification required', 'error');
        }
    }

    enableQuiz() {
        if (this.isQuizEnabled) return;
        
        console.log('Enabling quiz...');
        this.isQuizEnabled = true;
        this.isStudentVerified = true;
        this.verificationState = 'verified';
        
        // Remove disabled class from body
        document.body.classList.remove('quiz-disabled');
        
        // Hide dark overlay and blocked screen
        const darkOverlay = document.getElementById('darkOverlay');
        const blockedScreen = document.getElementById('verificationBlockedScreen');
        
        if (darkOverlay) darkOverlay.style.display = 'none';
        if (blockedScreen) blockedScreen.style.display = 'none';
        
        // Remove warning state from camera bubble
        const bubble = document.querySelector('.face-recognition-bubble');
        if (bubble) bubble.classList.remove('warning');
        
        // Store current state
        this.storeQuizState(true);
        
        // Show notification ONLY if:
        // 1. We just finished loading screen (first verification)
        // 2. OR we were previously disabled (switching from unverified to verified)
        const wasPreviouslyDisabled = document.body.classList.contains('quiz-disabled') || 
                                    localStorage.getItem('quizEnabled') === 'false';
        
        if (this.justFinishedLoading || wasPreviouslyDisabled) {
            this.showNotification('Quiz enabled. You can now answer questions.', 'success');
        }
        
        // Reset flags
        this.justFinishedLoading = false;
    }

    // In the hideLoadingScreen method, set the flag:
    hideLoadingScreen() {
        if (this.loadingScreen) {
            this.loadingScreen.style.display = 'none';
            document.body.style.overflow = '';
            
            // Set flag to show notification if verified immediately after loading
            if (this.isStudentVerified && !this.isQuizEnabled) {
                this.justFinishedLoading = true;
            }
        }
    }

    updateBubbleStatus() {
        const statusIcon = this.bubbleToggle.querySelector('i');
        const statusDot = this.bubbleStatus;
        
        switch(this.verificationState) {
            case 'verified':
                if (statusIcon) statusIcon.className = 'fas fa-user-check';
                if (statusDot) {
                    statusDot.className = 'bubble-status active';
                    statusDot.style.background = 'var(--green)';
                }
                break;
                
            case 'no-face':
                if (statusIcon) statusIcon.className = 'fas fa-user-slash';
                if (statusDot) {
                    statusDot.className = 'bubble-status inactive';
                    statusDot.style.background = 'var(--yellow)';
                }
                break;
                
            case 'wrong-face':
                if (statusIcon) statusIcon.className = 'fas fa-user-lock';
                if (statusDot) {
                    statusDot.className = 'bubble-status inactive';
                    statusDot.style.background = '#ef4444';
                }
                break;
                
            default:
                if (statusIcon) statusIcon.className = 'fas fa-camera';
                if (statusDot) {
                    statusDot.className = 'bubble-status';
                    statusDot.style.background = '#ccc';
                }
        }
    }

    storeQuizState(enabled) {
        localStorage.setItem('quizEnabled', enabled.toString());
        localStorage.setItem('lastVerificationTime', new Date().toISOString());
    }

    checkQuizState() {
        const storedState = localStorage.getItem('quizEnabled');
        const lastTime = localStorage.getItem('lastVerificationTime');
        
        if (storedState === 'false') {
            // Check if we should auto-enable after timeout
            if (lastTime) {
                const lastVerification = new Date(lastTime);
                const now = new Date();
                const minutesSince = (now - lastVerification) / (1000 * 60);
                
                // Auto-enable after 5 minutes of inactivity
                if (minutesSince > 5) {
                    this.enableQuiz();
                } else {
                    this.disableQuiz();
                }
            }
        }
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', async () => {
    // Check if we're on a lesson page
    if (document.querySelector('.lesson-container')) {
        // Wait for face-api to be available
        if (typeof faceapi === 'undefined') {
            console.error('face-api.js is not loaded. Please include it in your HTML.');
            return;
        }
        
        // Wait a moment for page to fully load
        setTimeout(() => {
            window.faceRecognitionSystem = new FaceRecognitionSystem();
        }, 1500);
    }
});

// Export for global access
if (typeof window !== 'undefined') {
    window.FaceRecognitionSystem = FaceRecognitionSystem;
}