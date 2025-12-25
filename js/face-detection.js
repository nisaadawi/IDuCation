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
        this.requiredConsecutiveMatches = 3; // Require 3 consecutive matches for verification
        
        this.isStudentVerified = false;
        this.isQuizEnabled = true;
        this.verificationTimeout = null;
        this.lastVerificationTime = null;

        this.init();
    }
    
    async init() {
        this.cacheElements();
        this.bindEvents();
        this.setupLessonMonitoring();
        
        // Load face recognition models
        await this.loadFaceRecognitionModels();
        
        // Extract features from reference photo
        await this.extractReferenceFaceFeatures();
        
        // Check saved quiz state
        this.checkQuizState();
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
    }
    
    bindEvents() {
        // Toggle bubble
        this.bubbleToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleBubble();
        });
        
        // Camera controls
        this.startCameraBtn.addEventListener('click', () => this.startCamera());
        this.stopCameraBtn.addEventListener('click', () => this.stopCamera());
        
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
            
        } catch (error) {
            console.error('Error starting camera:', error);
            this.showCameraError();
            this.showNotification(`Camera error: ${error.message}`, 'error');
        }
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
            
            // Update buttons
            this.startCameraBtn.disabled = true;
            this.startCameraBtn.innerHTML = '<i class="fas fa-camera"></i> Camera Active';
            this.stopCameraBtn.disabled = false;
            
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
        }, 5000); // Process every second
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
                
                // Only verify after required consecutive matches
                if (this.consecutiveMatches >= this.requiredConsecutiveMatches) {
                    this.updateVerificationStatus(true, 'Student verified ✓');
                    this.dispatchVerificationEvent(true);
                } else {
                    this.updateVerificationStatus('matching', `Verifying... (${this.consecutiveMatches}/${this.requiredConsecutiveMatches})`);
                }
            } else {
                this.consecutiveMismatches++;
                this.consecutiveMatches = 0;
                
                if (this.consecutiveMismatches >= 2) {
                    this.updateVerificationStatus(false, 'You are not student');
                    this.dispatchVerificationEvent(false);
                } else {
                    this.updateVerificationStatus('checking', 'Checking face...');
                }
            }
            
        } else {
            // No face detected
            this.consecutiveMatches = 0;
            this.consecutiveMismatches = 0;
            this.updateVerificationStatus('no-face', 'No face detected');
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
            
            // Update verification state
            this.isStudentVerified = isMatch;
            
            // Handle quiz state based on verification
            if (isMatch) {
                this.consecutiveMatches++;
                this.consecutiveMismatches = 0;
                
                if (this.consecutiveMatches >= this.requiredConsecutiveMatches) {
                    // Student verified - enable quiz
                    if (!this.isQuizEnabled) {
                        this.enableQuiz();
                    }
                    this.updateVerificationStatus(true, 'Student verified ✓');
                    this.dispatchVerificationEvent(true);
                }
            } else {
                this.consecutiveMismatches++;
                this.consecutiveMatches = 0;
                
                if (this.consecutiveMismatches >= 2) {
                    // Not student - disable quiz
                    if (this.isQuizEnabled) {
                        this.disableQuiz();
                    }
                    this.updateVerificationStatus(false, 'You are not student');
                    this.dispatchVerificationEvent(false);
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
        this.faceMatchStatus.classList.remove('matched', 'unmatched', 'verifying', 'checking', 'no-face');
        
        // Add appropriate class and update text
        switch (status) {
            case true: // Verified
                this.faceMatchStatus.classList.add('matched');
                this.faceMatchText.textContent = message;
                this.showMatchOverlay(true);
                
                // Dispatch quiz state change event
                const enableEvent = new CustomEvent('quizStateChange', {
                    detail: { enabled: true }
                });
                document.dispatchEvent(enableEvent);
                break;
                
            case false: // Not student
                this.faceMatchStatus.classList.add('unmatched');
                this.faceMatchText.textContent = message;
                this.showMatchOverlay(false);
                
                // Dispatch quiz state change event
                const disableEvent = new CustomEvent('quizStateChange', {
                    detail: { enabled: false }
                });
                document.dispatchEvent(disableEvent);
                break;
                
            case 'matching':
                this.faceMatchStatus.classList.add('verifying');
                this.faceMatchText.textContent = message;
                break;
                
            case 'checking':
                this.faceMatchStatus.classList.add('checking');
                this.faceMatchText.textContent = message;
                break;
                
            case 'no-face':
                this.faceMatchStatus.classList.add('no-face');
                this.faceMatchText.textContent = message;
                break;
                
            default:
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
            ? '<i class="fas fa-check-circle"></i><span>Verified Student</span>'
            : '<i class="fas fa-times-circle"></i><span>Not the Student</span>';
        overlay.className = `match-overlay ${isMatch ? 'match-success' : 'match-fail'}`;
        
        // Hide overlay after 3 seconds
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 5000);
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
            }, 5000); // Give 5 seconds before disabling
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


    disableQuiz() {
        if (!this.isQuizEnabled) return;
        
        console.log('Disabling quiz...');
        this.isQuizEnabled = false;
        
        // Add disabled class to body
        document.body.classList.add('quiz-disabled');
        
        // Show dark overlay
        const darkOverlay = document.getElementById('darkOverlay');
        const blockedScreen = document.getElementById('verificationBlockedScreen');
        
        if (darkOverlay) darkOverlay.style.display = 'block';
        if (blockedScreen) blockedScreen.style.display = 'block';
        
        // Add warning state to camera bubble
        const bubble = document.querySelector('.face-recognition-bubble');
        if (bubble) bubble.classList.add('warning');
        
        // Store current state
        this.storeQuizState(false);
        
        // Show notification
        this.showNotification('Quiz disabled - Unauthorized user detected', 'error');
    }

    enableQuiz() {
        if (this.isQuizEnabled) return;
        
        console.log('Enabling quiz...');
        this.isQuizEnabled = true;
        this.isStudentVerified = true;
        
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
        
        // Show notification
        this.showNotification('Quiz enabled - Student verified', 'success');
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