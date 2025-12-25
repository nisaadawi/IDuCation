// IDuCation - KSSR Curriculum Modules
// Comprehensive module system for ages 7-12 (Year 1-6 / Darjah 1-6)
// Aligned with Malaysian Primary School Standard Curriculum (KSSR)
// Covers all 6 years of primary education in Malaysia

const KSSRModules = {
    // Subject categories
    subjects: {
        mathematics: {
            name: 'Mathematics',
            nameMalay: 'Matematik',
            icon: 'calculator',
            color: '#4A90E2'
        },
        english: {
            name: 'English',
            nameMalay: 'Bahasa Inggeris',
            icon: 'language',
            color: '#50C878'
        },
        bahasaMelayu: {
            name: 'Bahasa Melayu',
            nameMalay: 'Bahasa Melayu',
            icon: 'book',
            color: '#FF6B6B'
        },
        science: {
            name: 'Science',
            nameMalay: 'Sains',
            icon: 'flask',
            color: '#9B59B6'
        },
        history: {
            name: 'History',
            nameMalay: 'Sejarah',
            icon: 'landmark',
            color: '#F39C12'
        },
        art: {
            name: 'Art & Creativity',
            nameMalay: 'Seni & Kreativiti',
            icon: 'paint-brush',
            color: '#E74C3C'
        }
    },

    // All modules organized by subject and year level
    modules: [
        // ==================== MATHEMATICS MODULES ====================
        {
            id: 'math_001',
            subject: 'mathematics',
            title: 'Numbers & Counting',
            titleMalay: 'Nombor & Mengira',
            yearLevel: 1,
            ageRange: '7-8',
            difficulty: 'beginner',
            description: 'Learn to count from 1 to 100 and identify numbers',
            descriptionMalay: 'Belajar mengira dari 1 hingga 100 dan mengenali nombor',
            icon: 'hashtag',
            xpReward: 50,
            estimatedTime: '15 minutes',
            totalQuestions: 5,
            unlocked: true,
            questions: [
                {
                    id: 1,
                    type: 'multiple-choice',
                    question: 'What number comes after 15?',
                    questionMalay: 'Apakah nombor selepas 15?',
                    options: [
                        { text: '14', correct: false },
                        { text: '16', correct: true },
                        { text: '15', correct: false },
                        { text: '17', correct: false }
                    ],
                    explanation: 'After 15 comes 16. Count: 13, 14, 15, 16!',
                    explanationMalay: 'Selepas 15 ialah 16. Kira: 13, 14, 15, 16!'
                },
                {
                    id: 2,
                    type: 'multiple-choice',
                    question: 'How many apples are shown?',
                    questionMalay: 'Berapa banyak epal yang ditunjukkan?',
                    image: '../../assets/images/apples.jpg',
                    options: [
                        { text: '6', correct: false },
                        { text: '7', correct: false },
                        { text: '8', correct: true },
                        { text: '9', correct: false }
                    ],
                    explanation: 'Count the apples one by one. There are 8 apples!',
                    explanationMalay: 'Kira epal satu persatu. Ada 8 biji epal!'
                },
                {
                    id: 3,
                    type: 'fill-blank',
                    question: 'Complete: 10, 20, 30, ____, 50',
                    questionMalay: 'Lengkapkan: 10, 20, 30, ____, 50',
                    correctAnswer: '40',
                    explanation: 'We are counting by tens. After 30 comes 40!',
                    explanationMalay: 'Kita mengira gandaan sepuluh. Selepas 30 ialah 40!'
                },
                {
                    id: 4,
                    type: 'multiple-choice',
                    question: 'Which number is the smallest?',
                    questionMalay: 'Nombor manakah yang paling kecil?',
                    options: [
                        { text: '25', correct: false },
                        { text: '12', correct: true },
                        { text: '38', correct: false },
                        { text: '45', correct: false }
                    ],
                    explanation: '12 is the smallest number. 12 < 25 < 38 < 45',
                    explanationMalay: '12 ialah nombor terkecil. 12 < 25 < 38 < 45'
                },
                {
                    id: 5,
                    type: 'multiple-choice',
                    question: 'Count the stars: ⭐⭐⭐⭐⭐ (5 stars)',
                    questionMalay: 'Kira bintang: ⭐⭐⭐⭐⭐',
                    options: [
                        { text: '4', correct: false },
                        { text: '5', correct: true },
                        { text: '6', correct: false },
                        { text: '7', correct: false }
                    ],
                    explanation: 'There are 5 stars. Great counting!',
                    explanationMalay: 'Ada 5 biji bintang. Mengira yang bagus!'
                }
            ]
        },
        {
            id: 'math_1_02',
            subject: 'mathematics',
            title: 'Numbers 21-50',
            titleMalay: 'Nombor 21-50',
            yearLevel: 1,
            ageRange: '7-8',
            difficulty: 'beginner',
            description: 'Learn to count and identify numbers from 21 to 50',
            descriptionMalay: 'Belajar mengira dan mengenali nombor dari 21 hingga 50',
            icon: 'hashtag',
            xpReward: 50,
            estimatedTime: '15 minutes',
            totalQuestions: 5,
            unlocked: false,
            prerequisites: ['math_001'],
            questions: [
                {
                    id: 1,
                    type: 'multiple-choice',
                    question: 'What number comes after 35?',
                    questionMalay: 'Apakah nombor selepas 35?',
                    options: [
                        { text: '34', correct: false },
                        { text: '36', correct: true },
                        { text: '35', correct: false },
                        { text: '37', correct: false }
                    ],
                    explanation: 'After 35 comes 36!',
                    explanationMalay: 'Selepas 35 ialah 36!'
                },
                {
                    id: 2,
                    type: 'multiple-choice',
                    question: 'Which number is between 40 and 42?',
                    questionMalay: 'Nombor manakah di antara 40 dan 42?',
                    options: [
                        { text: '39', correct: false },
                        { text: '41', correct: true },
                        { text: '43', correct: false },
                        { text: '45', correct: false }
                    ],
                    explanation: '41 is between 40 and 42!',
                    explanationMalay: '41 berada di antara 40 dan 42!'
                },
                {
                    id: 3,
                    type: 'fill-blank',
                    question: 'Complete: 25, 30, 35, ____, 45',
                    questionMalay: 'Lengkapkan: 25, 30, 35, ____, 45',
                    correctAnswer: '40',
                    explanation: 'We are counting by fives. After 35 comes 40!',
                    explanationMalay: 'Kita mengira gandaan lima. Selepas 35 ialah 40!'
                },
                {
                    id: 4,
                    type: 'multiple-choice',
                    question: 'What is the smallest number among these?',
                    questionMalay: 'Nombor manakah yang paling kecil?',
                    options: [
                        { text: '45', correct: false },
                        { text: '28', correct: true },
                        { text: '37', correct: false },
                        { text: '42', correct: false }
                    ],
                    explanation: '28 is the smallest. 28 < 37 < 42 < 45',
                    explanationMalay: '28 ialah nombor terkecil. 28 < 37 < 42 < 45'
                },
                {
                    id: 5,
                    type: 'multiple-choice',
                    question: 'How many tens are in 50?',
                    questionMalay: 'Berapa banyak puluh dalam 50?',
                    options: [
                        { text: '4', correct: false },
                        { text: '5', correct: true },
                        { text: '10', correct: false },
                        { text: '50', correct: false }
                    ],
                    explanation: '50 has 5 tens. 5 × 10 = 50!',
                    explanationMalay: '50 ada 5 puluh. 5 × 10 = 50!'
                }
            ]
        },
        {
            id: 'math_1_03',
            subject: 'mathematics',
            title: 'Simple Addition',
            titleMalay: 'Penambahan Mudah',
            yearLevel: 1,
            ageRange: '7-8',
            difficulty: 'beginner',
            description: 'Learn basic addition with numbers up to 10',
            descriptionMalay: 'Belajar penambahan asas dengan nombor hingga 10',
            icon: 'plus',
            xpReward: 55,
            estimatedTime: '18 minutes',
            totalQuestions: 5,
            unlocked: false,
            prerequisites: ['math_001'],
            questions: [
                {
                    id: 1,
                    type: 'multiple-choice',
                    question: 'What is 3 + 2?',
                    questionMalay: 'Berapakah 3 + 2?',
                    options: [
                        { text: '4', correct: false },
                        { text: '5', correct: true },
                        { text: '6', correct: false },
                        { text: '7', correct: false }
                    ],
                    explanation: '3 + 2 = 5. Count: 3, 4, 5!',
                    explanationMalay: '3 + 2 = 5. Kira: 3, 4, 5!'
                },
                {
                    id: 2,
                    type: 'multiple-choice',
                    question: 'What is 4 + 4?',
                    questionMalay: 'Berapakah 4 + 4?',
                    options: [
                        { text: '6', correct: false },
                        { text: '7', correct: false },
                        { text: '8', correct: true },
                        { text: '9', correct: false }
                    ],
                    explanation: '4 + 4 = 8. Double four equals eight!',
                    explanationMalay: '4 + 4 = 8. Dua kali empat sama dengan lapan!'
                },
                {
                    id: 3,
                    type: 'fill-blank',
                    question: 'Complete: 5 + ____ = 9',
                    questionMalay: 'Lengkapkan: 5 + ____ = 9',
                    correctAnswer: '4',
                    explanation: '5 + 4 = 9. We need 4 more to make 9!',
                    explanationMalay: '5 + 4 = 9. Kita perlukan 4 lagi untuk jadikan 9!'
                },
                {
                    id: 4,
                    type: 'multiple-choice',
                    question: 'Amin has 2 apples. He gets 3 more. How many apples does he have now?',
                    questionMalay: 'Amin ada 2 epal. Dia dapat 3 lagi. Berapa banyak epal dia ada sekarang?',
                    options: [
                        { text: '4', correct: false },
                        { text: '5', correct: true },
                        { text: '6', correct: false },
                        { text: '7', correct: false }
                    ],
                    explanation: '2 + 3 = 5. Amin has 5 apples now!',
                    explanationMalay: '2 + 3 = 5. Amin ada 5 biji epal sekarang!'
                },
                {
                    id: 5,
                    type: 'multiple-choice',
                    question: 'What is 6 + 1?',
                    questionMalay: 'Berapakah 6 + 1?',
                    options: [
                        { text: '5', correct: false },
                        { text: '6', correct: false },
                        { text: '7', correct: true },
                        { text: '8', correct: false }
                    ],
                    explanation: '6 + 1 = 7. One more than six is seven!',
                    explanationMalay: '6 + 1 = 7. Satu lebih daripada enam ialah tujuh!'
                }
            ]
        },
        {
            id: 'math_1_04',
            subject: 'mathematics',
            title: 'Simple Subtraction',
            titleMalay: 'Penolakan Mudah',
            yearLevel: 1,
            ageRange: '7-8',
            difficulty: 'beginner',
            description: 'Learn basic subtraction with numbers up to 10',
            descriptionMalay: 'Belajar penolakan asas dengan nombor hingga 10',
            icon: 'minus',
            xpReward: 55,
            estimatedTime: '18 minutes',
            totalQuestions: 5,
            unlocked: false,
            prerequisites: ['math_1_03'],
            questions: [
                {
                    id: 1,
                    type: 'multiple-choice',
                    question: 'What is 5 - 2?',
                    questionMalay: 'Berapakah 5 - 2?',
                    options: [
                        { text: '2', correct: false },
                        { text: '3', correct: true },
                        { text: '4', correct: false },
                        { text: '5', correct: false }
                    ],
                    explanation: '5 - 2 = 3. Start from 5, count back 2: 4, 3!',
                    explanationMalay: '5 - 2 = 3. Mulakan dari 5, kira ke belakang 2: 4, 3!'
                },
                {
                    id: 2,
                    type: 'multiple-choice',
                    question: 'What is 8 - 3?',
                    questionMalay: 'Berapakah 8 - 3?',
                    options: [
                        { text: '4', correct: false },
                        { text: '5', correct: true },
                        { text: '6', correct: false },
                        { text: '7', correct: false }
                    ],
                    explanation: '8 - 3 = 5. Start from 8, count back 3: 7, 6, 5!',
                    explanationMalay: '8 - 3 = 5. Mulakan dari 8, kira ke belakang 3: 7, 6, 5!'
                },
                {
                    id: 3,
                    type: 'fill-blank',
                    question: 'Complete: 9 - ____ = 4',
                    questionMalay: 'Lengkapkan: 9 - ____ = 4',
                    correctAnswer: '5',
                    explanation: '9 - 5 = 4. We need to subtract 5!',
                    explanationMalay: '9 - 5 = 4. Kita perlu tolak 5!'
                },
                {
                    id: 4,
                    type: 'multiple-choice',
                    question: 'Siti has 7 stickers. She gives away 2. How many stickers does she have left?',
                    questionMalay: 'Siti ada 7 pelekat. Dia beri 2. Berapa banyak pelekat yang tinggal?',
                    options: [
                        { text: '4', correct: false },
                        { text: '5', correct: true },
                        { text: '6', correct: false },
                        { text: '7', correct: false }
                    ],
                    explanation: '7 - 2 = 5. Siti has 5 stickers left!',
                    explanationMalay: '7 - 2 = 5. Siti ada 5 biji pelekat yang tinggal!'
                },
                {
                    id: 5,
                    type: 'multiple-choice',
                    question: 'What is 10 - 1?',
                    questionMalay: 'Berapakah 10 - 1?',
                    options: [
                        { text: '8', correct: false },
                        { text: '9', correct: true },
                        { text: '10', correct: false },
                        { text: '11', correct: false }
                    ],
                    explanation: '10 - 1 = 9. One less than ten is nine!',
                    explanationMalay: '10 - 1 = 9. Satu kurang daripada sepuluh ialah sembilan!'
                }
            ]
        },
        {
            id: 'math_1_05',
            subject: 'mathematics',
            title: 'Basic Shapes',
            titleMalay: 'Bentuk Asas',
            yearLevel: 1,
            ageRange: '7-8',
            difficulty: 'beginner',
            description: 'Learn to identify and name basic shapes',
            descriptionMalay: 'Belajar mengenali dan menamakan bentuk asas',
            icon: 'shapes',
            xpReward: 50,
            estimatedTime: '15 minutes',
            totalQuestions: 5,
            unlocked: false,
            prerequisites: ['math_001'],
            questions: [
                {
                    id: 1,
                    type: 'multiple-choice',
                    question: 'Which shape has 4 equal sides?',
                    questionMalay: 'Bentuk manakah yang mempunyai 4 sisi sama?',
                    options: [
                        { text: 'Circle', correct: false },
                        { text: 'Square', correct: true },
                        { text: 'Triangle', correct: false },
                        { text: 'Rectangle', correct: false }
                    ],
                    explanation: 'A square has 4 equal sides!',
                    explanationMalay: 'Segi empat sama mempunyai 4 sisi sama!'
                },
                {
                    id: 2,
                    type: 'multiple-choice',
                    question: 'Which shape has 3 sides?',
                    questionMalay: 'Bentuk manakah yang mempunyai 3 sisi?',
                    options: [
                        { text: 'Circle', correct: false },
                        { text: 'Square', correct: false },
                        { text: 'Triangle', correct: true },
                        { text: 'Rectangle', correct: false }
                    ],
                    explanation: 'A triangle has 3 sides!',
                    explanationMalay: 'Segi tiga mempunyai 3 sisi!'
                },
                {
                    id: 3,
                    type: 'true-false',
                    question: 'A circle has no corners.',
                    questionMalay: 'Bulatan tidak ada bucu.',
                    correctAnswer: true,
                    explanation: 'True! A circle has no corners, it is round!',
                    explanationMalay: 'Betul! Bulatan tidak ada bucu, ia bulat!'
                },
                {
                    id: 4,
                    type: 'multiple-choice',
                    question: 'Which shape is round?',
                    questionMalay: 'Bentuk manakah yang bulat?',
                    options: [
                        { text: 'Circle', correct: true },
                        { text: 'Square', correct: false },
                        { text: 'Triangle', correct: false },
                        { text: 'Rectangle', correct: false }
                    ],
                    explanation: 'A circle is round and has no corners!',
                    explanationMalay: 'Bulatan adalah bulat dan tidak ada bucu!'
                },
                {
                    id: 5,
                    type: 'multiple-choice',
                    question: 'A rectangle has how many sides?',
                    questionMalay: 'Segi empat tepat mempunyai berapa sisi?',
                    options: [
                        { text: '2', correct: false },
                        { text: '3', correct: false },
                        { text: '4', correct: true },
                        { text: '5', correct: false }
                    ],
                    explanation: 'A rectangle has 4 sides, with opposite sides equal!',
                    explanationMalay: 'Segi empat tepat mempunyai 4 sisi, dengan sisi bertentangan sama!'
                }
            ]
        },
        {
            id: 'math_002',
            subject: 'mathematics',
            title: 'Addition & Subtraction',
            titleMalay: 'Penambahan & Penolakan',
            yearLevel: 2,
            ageRange: '8-9',
            difficulty: 'beginner',
            description: 'Learn to add and subtract numbers up to 100',
            descriptionMalay: 'Belajar menambah dan menolak nombor hingga 100',
            icon: 'plus-minus',
            xpReward: 60,
            estimatedTime: '20 minutes',
            totalQuestions: 5,
            unlocked: false,
            prerequisites: ['math_1_03', 'math_1_04'],
            questions: [
                {
                    id: 1,
                    type: 'multiple-choice',
                    question: 'What is 5 + 3?',
                    questionMalay: 'Berapakah 5 + 3?',
                    options: [
                        { text: '7', correct: false },
                        { text: '8', correct: true },
                        { text: '9', correct: false },
                        { text: '10', correct: false }
                    ],
                    explanation: '5 + 3 = 8. Count: 5, 6, 7, 8!',
                    explanationMalay: '5 + 3 = 8. Kira: 5, 6, 7, 8!'
                },
                {
                    id: 2,
                    type: 'multiple-choice',
                    question: 'What is 12 - 4?',
                    questionMalay: 'Berapakah 12 - 4?',
                    options: [
                        { text: '6', correct: false },
                        { text: '7', correct: false },
                        { text: '8', correct: true },
                        { text: '9', correct: false }
                    ],
                    explanation: '12 - 4 = 8. Start from 12 and count backwards 4: 11, 10, 9, 8!',
                    explanationMalay: '12 - 4 = 8. Mulakan dari 12 dan kira ke belakang 4: 11, 10, 9, 8!'
                },
                {
                    id: 3,
                    type: 'fill-blank',
                    question: 'Complete: 10 + ____ = 18',
                    questionMalay: 'Lengkapkan: 10 + ____ = 18',
                    correctAnswer: '8',
                    explanation: '10 + 8 = 18. We need 8 more to make 18!',
                    explanationMalay: '10 + 8 = 18. Kita perlukan 8 lagi untuk jadikan 18!'
                },
                {
                    id: 4,
                    type: 'multiple-choice',
                    question: 'Ali has 15 marbles. He gives away 7. How many does he have left?',
                    questionMalay: 'Ali ada 15 guli. Dia beri 7. Berapa banyak yang tinggal?',
                    options: [
                        { text: '6', correct: false },
                        { text: '7', correct: false },
                        { text: '8', correct: true },
                        { text: '9', correct: false }
                    ],
                    explanation: '15 - 7 = 8. Ali has 8 marbles left!',
                    explanationMalay: '15 - 7 = 8. Ali ada 8 biji guli yang tinggal!'
                },
                {
                    id: 5,
                    type: 'multiple-choice',
                    question: 'What is 25 + 13?',
                    questionMalay: 'Berapakah 25 + 13?',
                    options: [
                        { text: '36', correct: false },
                        { text: '37', correct: false },
                        { text: '38', correct: true },
                        { text: '39', correct: false }
                    ],
                    explanation: '25 + 13 = 38. Add the ones first: 5+3=8, then tens: 2+1=3. Answer: 38!',
                    explanationMalay: '25 + 13 = 38. Tambah sa dahulu: 5+3=8, kemudian puluh: 2+1=3. Jawapan: 38!'
                }
            ]
        },
        {
            id: 'math_003',
            subject: 'mathematics',
            title: 'Multiplication Tables',
            titleMalay: 'Sifir',
            yearLevel: 3,
            ageRange: '9-10',
            difficulty: 'intermediate',
            description: 'Learn multiplication tables from 2 to 12',
            descriptionMalay: 'Belajar sifir dari 2 hingga 12',
            icon: 'times',
            xpReward: 75,
            estimatedTime: '25 minutes',
            totalQuestions: 5,
            unlocked: false,
            prerequisites: ['math_002'],
            questions: [
                {
                    id: 1,
                    type: 'multiple-choice',
                    question: 'What is 3 × 4?',
                    questionMalay: 'Berapakah 3 × 4?',
                    options: [
                        { text: '10', correct: false },
                        { text: '11', correct: false },
                        { text: '12', correct: true },
                        { text: '13', correct: false }
                    ],
                    explanation: '3 × 4 = 12. Three groups of four equals twelve!',
                    explanationMalay: '3 × 4 = 12. Tiga kumpulan empat sama dengan dua belas!'
                },
                {
                    id: 2,
                    type: 'multiple-choice',
                    question: 'What is 5 × 6?',
                    questionMalay: 'Berapakah 5 × 6?',
                    options: [
                        { text: '28', correct: false },
                        { text: '30', correct: true },
                        { text: '32', correct: false },
                        { text: '35', correct: false }
                    ],
                    explanation: '5 × 6 = 30. Five groups of six equals thirty!',
                    explanationMalay: '5 × 6 = 30. Lima kumpulan enam sama dengan tiga puluh!'
                },
                {
                    id: 3,
                    type: 'fill-blank',
                    question: 'Complete: 7 × ____ = 49',
                    questionMalay: 'Lengkapkan: 7 × ____ = 49',
                    correctAnswer: '7',
                    explanation: '7 × 7 = 49. Seven times seven equals forty-nine!',
                    explanationMalay: '7 × 7 = 49. Tujuh kali tujuh sama dengan empat puluh sembilan!'
                },
                {
                    id: 4,
                    type: 'multiple-choice',
                    question: 'Amin has 4 boxes. Each box has 9 pencils. How many pencils in total?',
                    questionMalay: 'Amin ada 4 kotak. Setiap kotak ada 9 pensel. Berapa banyak pensel keseluruhan?',
                    options: [
                        { text: '32', correct: false },
                        { text: '34', correct: false },
                        { text: '36', correct: true },
                        { text: '38', correct: false }
                    ],
                    explanation: '4 × 9 = 36. There are 36 pencils in total!',
                    explanationMalay: '4 × 9 = 36. Ada 36 batang pensel keseluruhan!'
                },
                {
                    id: 5,
                    type: 'multiple-choice',
                    question: 'What is 8 × 8?',
                    questionMalay: 'Berapakah 8 × 8?',
                    options: [
                        { text: '60', correct: false },
                        { text: '64', correct: true },
                        { text: '66', correct: false },
                        { text: '68', correct: false }
                    ],
                    explanation: '8 × 8 = 64. Eight times eight equals sixty-four!',
                    explanationMalay: '8 × 8 = 64. Lapan kali lapan sama dengan enam puluh empat!'
                }
            ]
        },
        {
            id: 'math_004',
            subject: 'mathematics',
            title: 'Fractions',
            titleMalay: 'Pecahan',
            yearLevel: 4,
            ageRange: '10-11',
            difficulty: 'intermediate',
            description: 'Learn about fractions: halves, quarters, and thirds',
            descriptionMalay: 'Belajar tentang pecahan: separuh, suku, dan satu pertiga',
            icon: 'divide',
            xpReward: 80,
            estimatedTime: '25 minutes',
            totalQuestions: 5,
            unlocked: false,
            prerequisites: ['math_003'],
            questions: [
                {
                    id: 1,
                    type: 'multiple-choice',
                    question: 'Which picture shows one half (½)?',
                    questionMalay: 'Gambar manakah menunjukkan separuh (½)?',
                    options: [
                        { text: '1 whole', correct: false },
                        { text: '2 equal parts, 1 colored', correct: true },
                        { text: '3 equal parts, 1 colored', correct: false },
                        { text: '4 equal parts, 1 colored', correct: false }
                    ],
                    explanation: 'One half means dividing something into 2 equal parts and taking 1 part!',
                    explanationMalay: 'Separuh bermaksud membahagikan sesuatu kepada 2 bahagian sama dan ambil 1 bahagian!'
                },
                {
                    id: 2,
                    type: 'multiple-choice',
                    question: 'What is ¼ (one quarter) of 8?',
                    questionMalay: 'Berapakah ¼ (suku) daripada 8?',
                    options: [
                        { text: '1', correct: false },
                        { text: '2', correct: true },
                        { text: '3', correct: false },
                        { text: '4', correct: false }
                    ],
                    explanation: '¼ of 8 = 2. Divide 8 into 4 equal parts, each part is 2!',
                    explanationMalay: '¼ daripada 8 = 2. Bahagikan 8 kepada 4 bahagian sama, setiap bahagian ialah 2!'
                },
                {
                    id: 3,
                    type: 'multiple-choice',
                    question: 'Which is bigger: ½ or ¼?',
                    questionMalay: 'Mana lebih besar: ½ atau ¼?',
                    options: [
                        { text: '½ is bigger', correct: true },
                        { text: '¼ is bigger', correct: false },
                        { text: 'They are equal', correct: false }
                    ],
                    explanation: '½ is bigger than ¼. One half is larger than one quarter!',
                    explanationMalay: '½ lebih besar daripada ¼. Separuh lebih besar daripada suku!'
                },
                {
                    id: 4,
                    type: 'fill-blank',
                    question: 'Complete: ½ of 10 = ____',
                    questionMalay: 'Lengkapkan: ½ daripada 10 = ____',
                    correctAnswer: '5',
                    explanation: '½ of 10 = 5. Divide 10 into 2 equal parts, each part is 5!',
                    explanationMalay: '½ daripada 10 = 5. Bahagikan 10 kepada 2 bahagian sama, setiap bahagian ialah 5!'
                },
                {
                    id: 5,
                    type: 'multiple-choice',
                    question: 'If a pizza is cut into 8 equal slices and you eat 2 slices, what fraction did you eat?',
                    questionMalay: 'Jika pizza dibahagikan kepada 8 keping sama dan anda makan 2 keping, pecahan berapa anda makan?',
                    options: [
                        { text: '¼', correct: true },
                        { text: '⅛', correct: false },
                        { text: '½', correct: false },
                        { text: '⅜', correct: false }
                    ],
                    explanation: '2 out of 8 slices = 2/8 = ¼. You ate one quarter of the pizza!',
                    explanationMalay: '2 daripada 8 keping = 2/8 = ¼. Anda makan suku daripada pizza!'
                }
            ]
        },

        // ==================== ENGLISH MODULES ====================
        {
            id: 'eng_001',
            subject: 'english',
            title: 'English Basics',
            titleMalay: 'Asas Bahasa Inggeris',
            yearLevel: 1,
            ageRange: '7-8',
            difficulty: 'beginner',
            description: 'Learn simple English words and sentences',
            descriptionMalay: 'Belajar perkataan dan ayat Bahasa Inggeris yang mudah',
            icon: 'language',
            xpReward: 50,
            estimatedTime: '15 minutes',
            totalQuestions: 5,
            unlocked: true,
            questions: [
                {
                    id: 1,
                    type: 'multiple-choice',
                    question: 'What is the English word for "rumah"?',
                    questionMalay: 'Apakah perkataan Inggeris untuk "rumah"?',
                    options: [
                        { text: 'House', correct: true },
                        { text: 'Home', correct: false },
                        { text: 'Room', correct: false },
                        { text: 'Building', correct: false }
                    ],
                    explanation: 'House means "rumah" in English!',
                    explanationMalay: 'House bermaksud "rumah" dalam Bahasa Inggeris!'
                },
                {
                    id: 2,
                    type: 'fill-blank',
                    question: 'Complete: "I ___ a student."',
                    questionMalay: 'Lengkapkan: "I ___ a student."',
                    correctAnswer: 'am',
                    explanation: 'I am a student. We use "am" with "I"!',
                    explanationMalay: 'I am a student. Kita guna "am" dengan "I"!'
                },
                {
                    id: 3,
                    type: 'multiple-choice',
                    question: 'Which sentence is correct?',
                    questionMalay: 'Ayat manakah yang betul?',
                    options: [
                        { text: 'This is a cat.', correct: true },
                        { text: 'This is cat.', correct: false },
                        { text: 'This are a cat.', correct: false },
                        { text: 'This am a cat.', correct: false }
                    ],
                    explanation: '"This is a cat" is correct. We use "is" with "this"!',
                    explanationMalay: '"This is a cat" betul. Kita guna "is" dengan "this"!'
                },
                {
                    id: 4,
                    type: 'multiple-choice',
                    question: 'What color is the sun?',
                    questionMalay: 'Apakah warna matahari?',
                    options: [
                        { text: 'Blue', correct: false },
                        { text: 'Yellow', correct: true },
                        { text: 'Green', correct: false },
                        { text: 'Purple', correct: false }
                    ],
                    explanation: 'The sun is yellow. It gives us light and warmth!',
                    explanationMalay: 'Matahari berwarna kuning. Ia memberikan kita cahaya dan kepanasan!'
                },
                {
                    id: 5,
                    type: 'multiple-choice',
                    question: 'How do you say "selamat pagi" in English?',
                    questionMalay: 'Bagaimana anda cakap "selamat pagi" dalam Bahasa Inggeris?',
                    options: [
                        { text: 'Good morning', correct: true },
                        { text: 'Good afternoon', correct: false },
                        { text: 'Good night', correct: false },
                        { text: 'Good evening', correct: false }
                    ],
                    explanation: 'Good morning means "selamat pagi" in English!',
                    explanationMalay: 'Good morning bermaksud "selamat pagi" dalam Bahasa Inggeris!'
                }
            ]
        },
        {
            id: 'eng_002',
            subject: 'english',
            title: 'Reading Stories',
            titleMalay: 'Membaca Cerita',
            yearLevel: 2,
            ageRange: '8-9',
            difficulty: 'beginner',
            description: 'Read simple English stories and answer questions',
            descriptionMalay: 'Baca cerita Bahasa Inggeris yang mudah dan jawab soalan',
            icon: 'book-reader',
            xpReward: 60,
            estimatedTime: '20 minutes',
            totalQuestions: 5,
            unlocked: false,
            prerequisites: ['eng_001'],
            story: 'The Little Bird\n\nOnce upon a time, there was a little bird who lived in a tall tree. The bird loved to sing every morning. One day, the bird saw a beautiful flower in the garden. The bird flew down to see the flower. The flower was red and smelled very nice.',
            storyMalay: 'Burung Kecil\n\nPada suatu hari dahulu, ada seekor burung kecil yang tinggal di pokok tinggi. Burung itu suka menyanyi setiap pagi. Suatu hari, burung itu nampak sekuntum bunga cantik di taman. Burung itu terbang ke bawah untuk tengok bunga. Bunga itu berwarna merah dan sangat wangi.',
            questions: [
                {
                    id: 1,
                    type: 'multiple-choice',
                    question: 'What did the bird love to do every morning?',
                    questionMalay: 'Apakah yang burung suka buat setiap pagi?',
                    options: [
                        { text: 'Fly in the sky', correct: false },
                        { text: 'Sing songs', correct: true },
                        { text: 'Eat food', correct: false },
                        { text: 'Sleep all day', correct: false }
                    ],
                    explanation: 'The bird loved to sing every morning!',
                    explanationMalay: 'Burung suka menyanyi setiap pagi!'
                },
                {
                    id: 2,
                    type: 'fill-blank',
                    question: 'The flower was ____ and smelled very nice.',
                    questionMalay: 'Bunga itu berwarna ____ dan sangat wangi.',
                    correctAnswer: 'red',
                    explanation: 'The flower was red. Red is a beautiful color!',
                    explanationMalay: 'Bunga itu berwarna merah. Merah ialah warna yang cantik!'
                },
                {
                    id: 3,
                    type: 'multiple-choice',
                    question: 'Where did the bird live?',
                    questionMalay: 'Di mana burung tinggal?',
                    options: [
                        { text: 'In a small house', correct: false },
                        { text: 'In a garden', correct: false },
                        { text: 'In a tall tree', correct: true },
                        { text: 'In a nest on the ground', correct: false }
                    ],
                    explanation: 'The bird lived in a tall tree!',
                    explanationMalay: 'Burung tinggal di pokok tinggi!'
                },
                {
                    id: 4,
                    type: 'true-false',
                    question: 'The bird flew down to see the flower.',
                    questionMalay: 'Burung terbang ke bawah untuk tengok bunga.',
                    correctAnswer: true,
                    explanation: 'True! The bird flew down to see the flower.',
                    explanationMalay: 'Betul! Burung terbang ke bawah untuk tengok bunga.'
                },
                {
                    id: 5,
                    type: 'multiple-choice',
                    question: 'What happened first in the story?',
                    questionMalay: 'Apakah yang berlaku dahulu dalam cerita?',
                    options: [
                        { text: 'The bird saw a flower', correct: false },
                        { text: 'The bird lived in a tall tree', correct: true },
                        { text: 'The bird flew down', correct: false },
                        { text: 'The bird sang songs', correct: false }
                    ],
                    explanation: 'First, the bird lived in a tall tree. Then it sang, then it saw the flower!',
                    explanationMalay: 'Pertama, burung tinggal di pokok tinggi. Kemudian ia menyanyi, kemudian ia nampak bunga!'
                }
            ]
        },

        // ==================== BAHASA MELAYU MODULES ====================
        {
            id: 'bm_001',
            subject: 'bahasaMelayu',
            title: 'Suku Kata',
            titleMalay: 'Suku Kata',
            yearLevel: 1,
            ageRange: '7-8',
            difficulty: 'beginner',
            description: 'Learn to read and write using syllables (suku kata)',
            descriptionMalay: 'Belajar membaca dan menulis menggunakan suku kata',
            icon: 'spell-check',
            xpReward: 50,
            estimatedTime: '15 minutes',
            totalQuestions: 5,
            unlocked: true,
            questions: [
                {
                    id: 1,
                    type: 'multiple-choice',
                    question: 'Apakah suku kata untuk perkataan "rumah"?',
                    questionMalay: 'Apakah suku kata untuk perkataan "rumah"?',
                    options: [
                        { text: 'ru-mah', correct: true },
                        { text: 'rum-ah', correct: false },
                        { text: 'r-u-m-a-h', correct: false },
                        { text: 'rumah', correct: false }
                    ],
                    explanation: '"rumah" dibahagikan kepada dua suku kata: ru-mah!',
                    explanationMalay: '"rumah" dibahagikan kepada dua suku kata: ru-mah!'
                },
                {
                    id: 2,
                    type: 'multiple-choice',
                    question: 'Berapakah bilangan suku kata dalam perkataan "kucing"?',
                    questionMalay: 'Berapakah bilangan suku kata dalam perkataan "kucing"?',
                    options: [
                        { text: '1', correct: false },
                        { text: '2', correct: true },
                        { text: '3', correct: false },
                        { text: '4', correct: false }
                    ],
                    explanation: '"kucing" ada 2 suku kata: ku-cing!',
                    explanationMalay: '"kucing" ada 2 suku kata: ku-cing!'
                },
                {
                    id: 3,
                    type: 'fill-blank',
                    question: 'Lengkapkan: ba-___ (untuk perkataan "baju")',
                    questionMalay: 'Lengkapkan: ba-___ (untuk perkataan "baju")',
                    correctAnswer: 'ju',
                    explanation: '"baju" = ba-ju. Suku kata kedua ialah "ju"!',
                    explanationMalay: '"baju" = ba-ju. Suku kata kedua ialah "ju"!'
                },
                {
                    id: 4,
                    type: 'multiple-choice',
                    question: 'Manakah suku kata yang betul untuk "sekolah"?',
                    questionMalay: 'Manakah suku kata yang betul untuk "sekolah"?',
                    options: [
                        { text: 'se-ko-lah', correct: true },
                        { text: 'sek-o-lah', correct: false },
                        { text: 'sekol-ah', correct: false },
                        { text: 'sekolah', correct: false }
                    ],
                    explanation: '"sekolah" ada 3 suku kata: se-ko-lah!',
                    explanationMalay: '"sekolah" ada 3 suku kata: se-ko-lah!'
                },
                {
                    id: 5,
                    type: 'multiple-choice',
                    question: 'Perkataan manakah yang mempunyai 2 suku kata?',
                    questionMalay: 'Perkataan manakah yang mempunyai 2 suku kata?',
                    options: [
                        { text: 'kereta', correct: false },
                        { text: 'meja', correct: true },
                        { text: 'pensel', correct: false },
                        { text: 'perpustakaan', correct: false }
                    ],
                    explanation: '"meja" ada 2 suku kata: me-ja!',
                    explanationMalay: '"meja" ada 2 suku kata: me-ja!'
                }
            ]
        },
        {
            id: 'bm_002',
            subject: 'bahasaMelayu',
            title: 'Bacaan & Kefahaman',
            titleMalay: 'Bacaan & Kefahaman',
            yearLevel: 2,
            ageRange: '8-9',
            difficulty: 'beginner',
            description: 'Read simple Malay stories and understand them',
            descriptionMalay: 'Baca cerita Bahasa Melayu yang mudah dan faham isinya',
            icon: 'book-open',
            xpReward: 60,
            estimatedTime: '20 minutes',
            totalQuestions: 5,
            unlocked: false,
            prerequisites: ['bm_001'],
            story: 'Ahmad dan Kucingnya\n\nAhmad ialah seorang budak lelaki yang baik hati. Dia ada seekor kucing bernama Comel. Comel sangat comel dan suka bermain. Setiap pagi, Ahmad memberi makan kepada Comel. Comel suka makan ikan. Ahmad dan Comel selalu bermain bersama di taman.',
            storyMalay: 'Ahmad dan Kucingnya\n\nAhmad ialah seorang budak lelaki yang baik hati. Dia ada seekor kucing bernama Comel. Comel sangat comel dan suka bermain. Setiap pagi, Ahmad memberi makan kepada Comel. Comel suka makan ikan. Ahmad dan Comel selalu bermain bersama di taman.',
            questions: [
                {
                    id: 1,
                    type: 'multiple-choice',
                    question: 'Siapakah nama kucing Ahmad?',
                    questionMalay: 'Siapakah nama kucing Ahmad?',
                    options: [
                        { text: 'Ahmad', correct: false },
                        { text: 'Comel', correct: true },
                        { text: 'Ikan', correct: false },
                        { text: 'Taman', correct: false }
                    ],
                    explanation: 'Nama kucing Ahmad ialah Comel!',
                    explanationMalay: 'Nama kucing Ahmad ialah Comel!'
                },
                {
                    id: 2,
                    type: 'multiple-choice',
                    question: 'Apakah yang Comel suka makan?',
                    questionMalay: 'Apakah yang Comel suka makan?',
                    options: [
                        { text: 'Nasi', correct: false },
                        { text: 'Ikan', correct: true },
                        { text: 'Sayur', correct: false },
                        { text: 'Buah', correct: false }
                    ],
                    explanation: 'Comel suka makan ikan!',
                    explanationMalay: 'Comel suka makan ikan!'
                },
                {
                    id: 3,
                    type: 'true-false',
                    question: 'Ahmad dan Comel selalu bermain bersama di taman.',
                    questionMalay: 'Ahmad dan Comel selalu bermain bersama di taman.',
                    correctAnswer: true,
                    explanation: 'Betul! Ahmad dan Comel selalu bermain bersama di taman.',
                    explanationMalay: 'Betul! Ahmad dan Comel selalu bermain bersama di taman.'
                },
                {
                    id: 4,
                    type: 'multiple-choice',
                    question: 'Bilakah Ahmad memberi makan kepada Comel?',
                    questionMalay: 'Bilakah Ahmad memberi makan kepada Comel?',
                    options: [
                        { text: 'Setiap malam', correct: false },
                        { text: 'Setiap pagi', correct: true },
                        { text: 'Setiap petang', correct: false },
                        { text: 'Kadang-kadang', correct: false }
                    ],
                    explanation: 'Ahmad memberi makan kepada Comel setiap pagi!',
                    explanationMalay: 'Ahmad memberi makan kepada Comel setiap pagi!'
                },
                {
                    id: 5,
                    type: 'fill-blank',
                    question: 'Ahmad ialah seorang budak lelaki yang ____.',
                    questionMalay: 'Ahmad ialah seorang budak lelaki yang ____.',
                    correctAnswer: 'baik hati',
                    explanation: 'Ahmad ialah seorang budak lelaki yang baik hati!',
                    explanationMalay: 'Ahmad ialah seorang budak lelaki yang baik hati!'
                }
            ]
        },

        // ==================== SCIENCE MODULES ====================
        {
            id: 'sci_001',
            subject: 'science',
            title: 'Living Things',
            titleMalay: 'Benda Hidup',
            yearLevel: 1,
            ageRange: '7-8',
            difficulty: 'beginner',
            description: 'Learn about living and non-living things',
            descriptionMalay: 'Belajar tentang benda hidup dan bukan hidup',
            icon: 'leaf',
            xpReward: 50,
            estimatedTime: '15 minutes',
            totalQuestions: 5,
            unlocked: true,
            questions: [
                {
                    id: 1,
                    type: 'multiple-choice',
                    question: 'Which of these is a living thing?',
                    questionMalay: 'Mana satu benda hidup?',
                    options: [
                        { text: 'Rock', correct: false },
                        { text: 'Tree', correct: true },
                        { text: 'Water', correct: false },
                        { text: 'Book', correct: false }
                    ],
                    explanation: 'A tree is a living thing. It grows, needs water, and makes its own food!',
                    explanationMalay: 'Pokok ialah benda hidup. Ia membesar, perlukan air, dan buat makanan sendiri!'
                },
                {
                    id: 2,
                    type: 'multiple-choice',
                    question: 'What do all living things need?',
                    questionMalay: 'Apakah yang semua benda hidup perlukan?',
                    options: [
                        { text: 'Water only', correct: false },
                        { text: 'Food and water', correct: true },
                        { text: 'Nothing', correct: false },
                        { text: 'Only air', correct: false }
                    ],
                    explanation: 'All living things need food and water to survive!',
                    explanationMalay: 'Semua benda hidup perlukan makanan dan air untuk hidup!'
                },
                {
                    id: 3,
                    type: 'true-false',
                    question: 'A cat is a living thing.',
                    questionMalay: 'Kucing ialah benda hidup.',
                    correctAnswer: true,
                    explanation: 'True! A cat is a living thing. It can move, eat, and grow!',
                    explanationMalay: 'Betul! Kucing ialah benda hidup. Ia boleh bergerak, makan, dan membesar!'
                },
                {
                    id: 4,
                    type: 'multiple-choice',
                    question: 'Which is NOT a living thing?',
                    questionMalay: 'Mana satu BUKAN benda hidup?',
                    options: [
                        { text: 'Bird', correct: false },
                        { text: 'Flower', correct: false },
                        { text: 'Car', correct: true },
                        { text: 'Fish', correct: false }
                    ],
                    explanation: 'A car is not a living thing. It cannot grow or eat!',
                    explanationMalay: 'Kereta bukan benda hidup. Ia tidak boleh membesar atau makan!'
                },
                {
                    id: 5,
                    type: 'multiple-choice',
                    question: 'Living things can:',
                    questionMalay: 'Benda hidup boleh:',
                    options: [
                        { text: 'Grow and move', correct: true },
                        { text: 'Only grow', correct: false },
                        { text: 'Only move', correct: false },
                        { text: 'Do nothing', correct: false }
                    ],
                    explanation: 'Living things can grow and move! They are active!',
                    explanationMalay: 'Benda hidup boleh membesar dan bergerak! Mereka aktif!'
                }
            ]
        },
        {
            id: 'sci_002',
            subject: 'science',
            title: 'Plants & Animals',
            titleMalay: 'Tumbuhan & Haiwan',
            yearLevel: 2,
            ageRange: '8-9',
            difficulty: 'beginner',
            description: 'Learn about different types of plants and animals',
            descriptionMalay: 'Belajar tentang pelbagai jenis tumbuhan dan haiwan',
            icon: 'tree',
            xpReward: 60,
            estimatedTime: '20 minutes',
            totalQuestions: 5,
            unlocked: false,
            prerequisites: ['sci_001'],
            questions: [
                {
                    id: 1,
                    type: 'multiple-choice',
                    question: 'What part of the plant makes food?',
                    questionMalay: 'Bahagian manakah tumbuhan yang membuat makanan?',
                    options: [
                        { text: 'Roots', correct: false },
                        { text: 'Leaves', correct: true },
                        { text: 'Stem', correct: false },
                        { text: 'Flower', correct: false }
                    ],
                    explanation: 'Leaves make food for the plant using sunlight!',
                    explanationMalay: 'Daun membuat makanan untuk tumbuhan menggunakan cahaya matahari!'
                },
                {
                    id: 2,
                    type: 'multiple-choice',
                    question: 'Which animal lives in water?',
                    questionMalay: 'Haiwan manakah yang tinggal di air?',
                    options: [
                        { text: 'Cat', correct: false },
                        { text: 'Dog', correct: false },
                        { text: 'Fish', correct: true },
                        { text: 'Bird', correct: false }
                    ],
                    explanation: 'Fish live in water. They have fins and gills to breathe!',
                    explanationMalay: 'Ikan tinggal di air. Mereka ada sirip dan insang untuk bernafas!'
                },
                {
                    id: 3,
                    type: 'true-false',
                    question: 'Plants need sunlight to grow.',
                    questionMalay: 'Tumbuhan perlukan cahaya matahari untuk membesar.',
                    correctAnswer: true,
                    explanation: 'True! Plants need sunlight to make their food and grow!',
                    explanationMalay: 'Betul! Tumbuhan perlukan cahaya matahari untuk buat makanan dan membesar!'
                },
                {
                    id: 4,
                    type: 'multiple-choice',
                    question: 'What do roots do for a plant?',
                    questionMalay: 'Apakah fungsi akar untuk tumbuhan?',
                    options: [
                        { text: 'Make food', correct: false },
                        { text: 'Absorb water and hold the plant', correct: true },
                        { text: 'Make flowers', correct: false },
                        { text: 'Catch insects', correct: false }
                    ],
                    explanation: 'Roots absorb water from the soil and hold the plant in place!',
                    explanationMalay: 'Akar menyerap air dari tanah dan memegang tumbuhan!'
                },
                {
                    id: 5,
                    type: 'multiple-choice',
                    question: 'Which animal can fly?',
                    questionMalay: 'Haiwan manakah yang boleh terbang?',
                    options: [
                        { text: 'Fish', correct: false },
                        { text: 'Bird', correct: true },
                        { text: 'Cat', correct: false },
                        { text: 'Rabbit', correct: false }
                    ],
                    explanation: 'Birds can fly! They have wings and feathers!',
                    explanationMalay: 'Burung boleh terbang! Mereka ada sayap dan bulu!'
                }
            ]
        },

        // ==================== YEAR 5 MODULES ====================
        {
            id: 'math_5_01',
            subject: 'mathematics',
            title: 'Decimals & Percentages',
            titleMalay: 'Pecahan Perpuluhan & Peratusan',
            yearLevel: 5,
            ageRange: '11-12',
            difficulty: 'advanced',
            description: 'Learn about decimals and percentages',
            descriptionMalay: 'Belajar tentang pecahan perpuluhan dan peratusan',
            icon: 'percent',
            xpReward: 90,
            estimatedTime: '30 minutes',
            totalQuestions: 5,
            unlocked: false,
            prerequisites: ['math_004'],
            questions: [
                {
                    id: 1,
                    type: 'multiple-choice',
                    question: 'What is 0.5 as a percentage?',
                    questionMalay: 'Berapakah 0.5 sebagai peratusan?',
                    options: [
                        { text: '5%', correct: false },
                        { text: '50%', correct: true },
                        { text: '500%', correct: false },
                        { text: '0.5%', correct: false }
                    ],
                    explanation: '0.5 = 50%. Move the decimal point two places to the right!',
                    explanationMalay: '0.5 = 50%. Alihkan titik perpuluhan dua tempat ke kanan!'
                },
                {
                    id: 2,
                    type: 'multiple-choice',
                    question: 'Which is bigger: 0.7 or 0.07?',
                    questionMalay: 'Mana lebih besar: 0.7 atau 0.07?',
                    options: [
                        { text: '0.7 is bigger', correct: true },
                        { text: '0.07 is bigger', correct: false },
                        { text: 'They are equal', correct: false }
                    ],
                    explanation: '0.7 is bigger than 0.07. Seven tenths is more than seven hundredths!',
                    explanationMalay: '0.7 lebih besar daripada 0.07. Tujuh persepuluh lebih banyak daripada tujuh perseratus!'
                },
                {
                    id: 3,
                    type: 'fill-blank',
                    question: 'Complete: 25% = ____',
                    questionMalay: 'Lengkapkan: 25% = ____',
                    correctAnswer: '0.25',
                    explanation: '25% = 0.25. Percentage divided by 100 equals decimal!',
                    explanationMalay: '25% = 0.25. Peratusan dibahagikan dengan 100 sama dengan perpuluhan!'
                },
                {
                    id: 4,
                    type: 'multiple-choice',
                    question: 'If 50% of 20 students passed, how many students passed?',
                    questionMalay: 'Jika 50% daripada 20 pelajar lulus, berapa ramai pelajar yang lulus?',
                    options: [
                        { text: '5', correct: false },
                        { text: '10', correct: true },
                        { text: '15', correct: false },
                        { text: '20', correct: false }
                    ],
                    explanation: '50% of 20 = 10. Half of 20 is 10!',
                    explanationMalay: '50% daripada 20 = 10. Separuh daripada 20 ialah 10!'
                },
                {
                    id: 5,
                    type: 'multiple-choice',
                    question: 'What is ¾ as a decimal?',
                    questionMalay: 'Berapakah ¾ sebagai perpuluhan?',
                    options: [
                        { text: '0.25', correct: false },
                        { text: '0.5', correct: false },
                        { text: '0.75', correct: true },
                        { text: '1.0', correct: false }
                    ],
                    explanation: '¾ = 0.75. Three quarters equals seventy-five hundredths!',
                    explanationMalay: '¾ = 0.75. Tiga suku sama dengan tujuh puluh lima perseratus!'
                }
            ]
        },
        {
            id: 'eng_5_01',
            subject: 'english',
            title: 'Advanced Grammar',
            titleMalay: 'Tatabahasa Lanjutan',
            yearLevel: 5,
            ageRange: '11-12',
            difficulty: 'advanced',
            description: 'Learn advanced English grammar and sentence structures',
            descriptionMalay: 'Belajar tatabahasa Bahasa Inggeris lanjutan dan struktur ayat',
            icon: 'language',
            xpReward: 90,
            estimatedTime: '30 minutes',
            totalQuestions: 5,
            unlocked: false,
            prerequisites: ['eng_002'],
            questions: [
                {
                    id: 1,
                    type: 'multiple-choice',
                    question: 'Choose the correct sentence:',
                    questionMalay: 'Pilih ayat yang betul:',
                    options: [
                        { text: 'I have been studying for two hours.', correct: true },
                        { text: 'I have been study for two hours.', correct: false },
                        { text: 'I have been studies for two hours.', correct: false },
                        { text: 'I have been studied for two hours.', correct: false }
                    ],
                    explanation: 'Present perfect continuous uses "have been + verb-ing"!',
                    explanationMalay: 'Present perfect continuous guna "have been + verb-ing"!'
                },
                {
                    id: 2,
                    type: 'multiple-choice',
                    question: 'Which sentence uses passive voice correctly?',
                    questionMalay: 'Ayat manakah yang guna passive voice dengan betul?',
                    options: [
                        { text: 'The cake was eaten by Ali.', correct: true },
                        { text: 'The cake eaten by Ali.', correct: false },
                        { text: 'The cake is eat by Ali.', correct: false },
                        { text: 'The cake eating by Ali.', correct: false }
                    ],
                    explanation: 'Passive voice: "was + past participle (eaten)"!',
                    explanationMalay: 'Passive voice: "was + past participle (eaten)"!'
                },
                {
                    id: 3,
                    type: 'fill-blank',
                    question: 'Complete: If I ____ (be) rich, I would travel the world.',
                    questionMalay: 'Lengkapkan: If I ____ (be) rich, I would travel the world.',
                    correctAnswer: 'were',
                    explanation: 'Use "were" in conditional sentences (even with "I")!',
                    explanationMalay: 'Guna "were" dalam ayat bersyarat (walaupun dengan "I")!'
                },
                {
                    id: 4,
                    type: 'multiple-choice',
                    question: 'Choose the correct form: "Neither the students nor the teacher ____ present."',
                    questionMalay: 'Pilih bentuk betul: "Neither the students nor the teacher ____ present."',
                    options: [
                        { text: 'was', correct: true },
                        { text: 'were', correct: false },
                        { text: 'is', correct: false },
                        { text: 'are', correct: false }
                    ],
                    explanation: 'With "neither...nor", the verb agrees with the nearest subject (teacher = singular = was)!',
                    explanationMalay: 'Dengan "neither...nor", kata kerja setuju dengan subjek terdekat (teacher = tunggal = was)!'
                },
                {
                    id: 5,
                    type: 'multiple-choice',
                    question: 'What is the past participle of "swim"?',
                    questionMalay: 'Apakah past participle untuk "swim"?',
                    options: [
                        { text: 'swimmed', correct: false },
                        { text: 'swam', correct: false },
                        { text: 'swum', correct: true },
                        { text: 'swim', correct: false }
                    ],
                    explanation: 'Swim (present) → Swam (past) → Swum (past participle)!',
                    explanationMalay: 'Swim (sekarang) → Swam (lalu) → Swum (past participle)!'
                }
            ]
        },
        {
            id: 'bm_5_01',
            subject: 'bahasaMelayu',
            title: 'Karangan & Ejaan',
            titleMalay: 'Karangan & Ejaan',
            yearLevel: 5,
            ageRange: '11-12',
            difficulty: 'advanced',
            description: 'Learn essay writing and spelling in Bahasa Melayu',
            descriptionMalay: 'Belajar menulis karangan dan ejaan dalam Bahasa Melayu',
            icon: 'pen',
            xpReward: 90,
            estimatedTime: '30 minutes',
            totalQuestions: 5,
            unlocked: false,
            prerequisites: ['bm_002'],
            questions: [
                {
                    id: 1,
                    type: 'multiple-choice',
                    question: 'Perkataan manakah yang dieja dengan betul?',
                    questionMalay: 'Perkataan manakah yang dieja dengan betul?',
                    options: [
                        { text: 'pendidikan', correct: true },
                        { text: 'pendidekan', correct: false },
                        { text: 'pendidikan', correct: false },
                        { text: 'pendidekan', correct: false }
                    ],
                    explanation: '"Pendidikan" dieja dengan "d-i-k-a-n"!',
                    explanationMalay: '"Pendidikan" dieja dengan "d-i-k-a-n"!'
                },
                {
                    id: 2,
                    type: 'multiple-choice',
                    question: 'Ayat manakah yang mempunyai struktur karangan yang baik?',
                    questionMalay: 'Ayat manakah yang mempunyai struktur karangan yang baik?',
                    options: [
                        { text: 'Pendahuluan, Isi, Penutup', correct: true },
                        { text: 'Isi, Pendahuluan, Penutup', correct: false },
                        { text: 'Penutup, Isi, Pendahuluan', correct: false },
                        { text: 'Isi sahaja', correct: false }
                    ],
                    explanation: 'Struktur karangan yang baik: Pendahuluan → Isi → Penutup!',
                    explanationMalay: 'Struktur karangan yang baik: Pendahuluan → Isi → Penutup!'
                },
                {
                    id: 3,
                    type: 'fill-blank',
                    question: 'Lengkapkan: Sekolah saya ____ (besar) dan ____ (cantik).',
                    questionMalay: 'Lengkapkan: Sekolah saya ____ (besar) dan ____ (cantik).',
                    correctAnswer: 'besar cantik',
                    explanation: 'Guna kata sifat: "besar" dan "cantik"!',
                    explanationMalay: 'Guna kata sifat: "besar" dan "cantik"!'
                },
                {
                    id: 4,
                    type: 'multiple-choice',
                    question: 'Perkataan manakah yang menggunakan imbuhan "ber-" dengan betul?',
                    questionMalay: 'Perkataan manakah yang menggunakan imbuhan "ber-" dengan betul?',
                    options: [
                        { text: 'bermain', correct: true },
                        { text: 'memain', correct: false },
                        { text: 'mainan', correct: false },
                        { text: 'termain', correct: false }
                    ],
                    explanation: '"ber-" + "main" = "bermain"!',
                    explanationMalay: '"ber-" + "main" = "bermain"!'
                },
                {
                    id: 5,
                    type: 'multiple-choice',
                    question: 'Ayat manakah yang menggunakan tanda baca dengan betul?',
                    questionMalay: 'Ayat manakah yang menggunakan tanda baca dengan betul?',
                    options: [
                        { text: 'Ali berkata, "Saya gembira hari ini."', correct: true },
                        { text: 'Ali berkata, Saya gembira hari ini.', correct: false },
                        { text: 'Ali berkata "Saya gembira hari ini".', correct: false },
                        { text: 'Ali berkata "Saya gembira hari ini', correct: false }
                    ],
                    explanation: 'Petikan mesti ada koma sebelum petikan dan tanda titik dalam petikan!',
                    explanationMalay: 'Petikan mesti ada koma sebelum petikan dan tanda titik dalam petikan!'
                }
            ]
        },
        {
            id: 'sci_5_01',
            subject: 'science',
            title: 'Matter & Energy',
            titleMalay: 'Jirim & Tenaga',
            yearLevel: 5,
            ageRange: '11-12',
            difficulty: 'advanced',
            description: 'Learn about states of matter, energy, and how they change',
            descriptionMalay: 'Belajar tentang keadaan jirim, tenaga, dan bagaimana ia berubah',
            icon: 'atom',
            xpReward: 90,
            estimatedTime: '30 minutes',
            totalQuestions: 5,
            unlocked: false,
            prerequisites: ['sci_002'],
            questions: [
                {
                    id: 1,
                    type: 'multiple-choice',
                    question: 'How many states of matter are there?',
                    questionMalay: 'Berapa banyak keadaan jirim?',
                    options: [
                        { text: '2', correct: false },
                        { text: '3', correct: true },
                        { text: '4', correct: false },
                        { text: '5', correct: false }
                    ],
                    explanation: 'There are 3 states: Solid, Liquid, and Gas!',
                    explanationMalay: 'Ada 3 keadaan: Pepejal, Cecair, dan Gas!'
                },
                {
                    id: 2,
                    type: 'multiple-choice',
                    question: 'What happens when water freezes?',
                    questionMalay: 'Apakah yang berlaku apabila air membeku?',
                    options: [
                        { text: 'Liquid becomes solid', correct: true },
                        { text: 'Solid becomes liquid', correct: false },
                        { text: 'Gas becomes liquid', correct: false },
                        { text: 'Nothing changes', correct: false }
                    ],
                    explanation: 'Freezing changes liquid water to solid ice!',
                    explanationMalay: 'Pembekuan tukar air cecair kepada ais pepejal!'
                },
                {
                    id: 3,
                    type: 'true-false',
                    question: 'Energy can be created or destroyed.',
                    questionMalay: 'Tenaga boleh dicipta atau dimusnahkan.',
                    correctAnswer: false,
                    explanation: 'False! Energy can only be transformed from one form to another!',
                    explanationMalay: 'Salah! Tenaga hanya boleh ditukar dari satu bentuk kepada bentuk lain!'
                },
                {
                    id: 4,
                    type: 'multiple-choice',
                    question: 'What type of energy does a moving car have?',
                    questionMalay: 'Jenis tenaga manakah yang ada pada kereta yang bergerak?',
                    options: [
                        { text: 'Kinetic energy', correct: true },
                        { text: 'Potential energy', correct: false },
                        { text: 'Solar energy', correct: false },
                        { text: 'Heat energy', correct: false }
                    ],
                    explanation: 'Moving objects have kinetic energy (energy of motion)!',
                    explanationMalay: 'Objek bergerak ada tenaga kinetik (tenaga gerakan)!'
                },
                {
                    id: 5,
                    type: 'multiple-choice',
                    question: 'What is evaporation?',
                    questionMalay: 'Apakah penyejatan?',
                    options: [
                        { text: 'Liquid to gas', correct: true },
                        { text: 'Gas to liquid', correct: false },
                        { text: 'Solid to liquid', correct: false },
                        { text: 'Solid to gas', correct: false }
                    ],
                    explanation: 'Evaporation is when liquid turns into gas (like water to water vapor)!',
                    explanationMalay: 'Penyejatan ialah apabila cecair tukar kepada gas (seperti air kepada wap air)!'
                }
            ]
        },

        // ==================== YEAR 6 MODULES ====================
        {
            id: 'math_6_01',
            subject: 'mathematics',
            title: 'Problem Solving & Algebra',
            titleMalay: 'Penyelesaian Masalah & Algebra',
            yearLevel: 6,
            ageRange: '12',
            difficulty: 'advanced',
            description: 'Solve complex word problems and learn basic algebra',
            descriptionMalay: 'Selesaikan masalah kata yang kompleks dan belajar algebra asas',
            icon: 'brain',
            xpReward: 100,
            estimatedTime: '35 minutes',
            totalQuestions: 5,
            unlocked: false,
            prerequisites: ['math_5_01'],
            questions: [
                {
                    id: 1,
                    type: 'multiple-choice',
                    question: 'If x + 5 = 12, what is x?',
                    questionMalay: 'Jika x + 5 = 12, apakah x?',
                    options: [
                        { text: '5', correct: false },
                        { text: '7', correct: true },
                        { text: '12', correct: false },
                        { text: '17', correct: false }
                    ],
                    explanation: 'x + 5 = 12, so x = 12 - 5 = 7!',
                    explanationMalay: 'x + 5 = 12, jadi x = 12 - 5 = 7!'
                },
                {
                    id: 2,
                    type: 'multiple-choice',
                    question: 'A book costs RM 15. If you have RM 50, how many books can you buy?',
                    questionMalay: 'Sebuah buku berharga RM 15. Jika anda ada RM 50, berapa banyak buku boleh dibeli?',
                    options: [
                        { text: '2', correct: false },
                        { text: '3', correct: true },
                        { text: '4', correct: false },
                        { text: '5', correct: false }
                    ],
                    explanation: 'RM 50 ÷ RM 15 = 3 books (with RM 5 left)!',
                    explanationMalay: 'RM 50 ÷ RM 15 = 3 buah buku (dengan baki RM 5)!'
                },
                {
                    id: 3,
                    type: 'fill-blank',
                    question: 'If 3y = 18, then y = ____',
                    questionMalay: 'Jika 3y = 18, maka y = ____',
                    correctAnswer: '6',
                    explanation: '3y = 18, so y = 18 ÷ 3 = 6!',
                    explanationMalay: '3y = 18, jadi y = 18 ÷ 3 = 6!'
                },
                {
                    id: 4,
                    type: 'multiple-choice',
                    question: 'The area of a rectangle is length × width. If length = 8cm and width = 5cm, what is the area?',
                    questionMalay: 'Luas segi empat tepat ialah panjang × lebar. Jika panjang = 8cm dan lebar = 5cm, apakah luasnya?',
                    options: [
                        { text: '13 cm²', correct: false },
                        { text: '26 cm²', correct: false },
                        { text: '40 cm²', correct: true },
                        { text: '45 cm²', correct: false }
                    ],
                    explanation: 'Area = 8 × 5 = 40 cm²!',
                    explanationMalay: 'Luas = 8 × 5 = 40 cm²!'
                },
                {
                    id: 5,
                    type: 'multiple-choice',
                    question: 'What is 20% of 150?',
                    questionMalay: 'Berapakah 20% daripada 150?',
                    options: [
                        { text: '20', correct: false },
                        { text: '30', correct: true },
                        { text: '40', correct: false },
                        { text: '50', correct: false }
                    ],
                    explanation: '20% of 150 = 0.20 × 150 = 30!',
                    explanationMalay: '20% daripada 150 = 0.20 × 150 = 30!'
                }
            ]
        },
        {
            id: 'eng_6_01',
            subject: 'english',
            title: 'Creative Writing & Comprehension',
            titleMalay: 'Penulisan Kreatif & Kefahaman',
            yearLevel: 6,
            ageRange: '12',
            difficulty: 'advanced',
            description: 'Write creative stories and understand complex texts',
            descriptionMalay: 'Tulis cerita kreatif dan faham teks yang kompleks',
            icon: 'pen-fancy',
            xpReward: 100,
            estimatedTime: '35 minutes',
            totalQuestions: 5,
            unlocked: false,
            prerequisites: ['eng_5_01'],
            questions: [
                {
                    id: 1,
                    type: 'multiple-choice',
                    question: 'Which is the best opening sentence for a story?',
                    questionMalay: 'Manakah ayat pembuka cerita yang terbaik?',
                    options: [
                        { text: 'Once upon a time, in a faraway village...', correct: true },
                        { text: 'I went to school.', correct: false },
                        { text: 'Hello.', correct: false },
                        { text: 'The end.', correct: false }
                    ],
                    explanation: 'Good stories start with interesting openings that capture attention!',
                    explanationMalay: 'Cerita yang baik bermula dengan pembukaan menarik yang menarik perhatian!'
                },
                {
                    id: 2,
                    type: 'multiple-choice',
                    question: 'What is the main idea of a story?',
                    questionMalay: 'Apakah idea utama cerita?',
                    options: [
                        { text: 'The most important message or lesson', correct: true },
                        { text: 'The longest sentence', correct: false },
                        { text: 'The first word', correct: false },
                        { text: 'The title only', correct: false }
                    ],
                    explanation: 'The main idea is the central message the author wants to convey!',
                    explanationMalay: 'Idea utama ialah mesej utama yang penulis mahu sampaikan!'
                },
                {
                    id: 3,
                    type: 'fill-blank',
                    question: 'Complete: A story needs a beginning, ____, and an ending.',
                    questionMalay: 'Lengkapkan: Cerita perlu permulaan, ____, dan pengakhiran.',
                    correctAnswer: 'middle',
                    explanation: 'Stories have three parts: beginning, middle, and ending!',
                    explanationMalay: 'Cerita ada tiga bahagian: permulaan, pertengahan, dan pengakhiran!'
                },
                {
                    id: 4,
                    type: 'multiple-choice',
                    question: 'What does "comprehension" mean?',
                    questionMalay: 'Apakah maksud "comprehension"?',
                    options: [
                        { text: 'Understanding what you read', correct: true },
                        { text: 'Writing quickly', correct: false },
                        { text: 'Memorizing words', correct: false },
                        { text: 'Speaking loudly', correct: false }
                    ],
                    explanation: 'Comprehension means understanding and making meaning from text!',
                    explanationMalay: 'Kefahaman bermaksud memahami dan membuat maksud dari teks!'
                },
                {
                    id: 5,
                    type: 'multiple-choice',
                    question: 'Which sentence uses descriptive language?',
                    questionMalay: 'Ayat manakah yang guna bahasa deskriptif?',
                    options: [
                        { text: 'The bright yellow sun shone warmly on the green fields.', correct: true },
                        { text: 'The sun was there.', correct: false },
                        { text: 'Sun.', correct: false },
                        { text: 'It was nice.', correct: false }
                    ],
                    explanation: 'Descriptive language uses adjectives and details to paint a picture!',
                    explanationMalay: 'Bahasa deskriptif guna kata sifat dan butiran untuk melukis gambar!'
                }
            ]
        },
        {
            id: 'bm_6_01',
            subject: 'bahasaMelayu',
            title: 'Kajian Sastera & Komposisi',
            titleMalay: 'Kajian Sastera & Komposisi',
            yearLevel: 6,
            ageRange: '12',
            difficulty: 'advanced',
            description: 'Study literature and compose advanced essays',
            descriptionMalay: 'Kaji sastera dan tulis karangan lanjutan',
            icon: 'book-reader',
            xpReward: 100,
            estimatedTime: '35 minutes',
            totalQuestions: 5,
            unlocked: false,
            prerequisites: ['bm_5_01'],
            questions: [
                {
                    id: 1,
                    type: 'multiple-choice',
                    question: 'Apakah elemen utama dalam puisi?',
                    questionMalay: 'Apakah elemen utama dalam puisi?',
                    options: [
                        { text: 'Rima, irama, dan metafora', correct: true },
                        { text: 'Nombor sahaja', correct: false },
                        { text: 'Graf sahaja', correct: false },
                        { text: 'Formula sahaja', correct: false }
                    ],
                    explanation: 'Puisi menggunakan rima, irama, dan metafora untuk menyampaikan makna!',
                    explanationMalay: 'Puisi menggunakan rima, irama, dan metafora untuk menyampaikan makna!'
                },
                {
                    id: 2,
                    type: 'multiple-choice',
                    question: 'Apakah yang dimaksudkan dengan "plot" dalam cerita?',
                    questionMalay: 'Apakah yang dimaksudkan dengan "plot" dalam cerita?',
                    options: [
                        { text: 'Urutan peristiwa dalam cerita', correct: true },
                        { text: 'Watak utama sahaja', correct: false },
                        { text: 'Lokasi sahaja', correct: false },
                        { text: 'Tajuk sahaja', correct: false }
                    ],
                    explanation: 'Plot ialah urutan peristiwa yang berlaku dalam cerita!',
                    explanationMalay: 'Plot ialah urutan peristiwa yang berlaku dalam cerita!'
                },
                {
                    id: 3,
                    type: 'fill-blank',
                    question: 'Lengkapkan: Dalam karangan, ____ menyatakan idea utama setiap perenggan.',
                    questionMalay: 'Lengkapkan: Dalam karangan, ____ menyatakan idea utama setiap perenggan.',
                    correctAnswer: 'ayat topik',
                    explanation: 'Ayat topik menyatakan idea utama setiap perenggan!',
                    explanationMalay: 'Ayat topik menyatakan idea utama setiap perenggan!'
                },
                {
                    id: 4,
                    type: 'multiple-choice',
                    question: 'Apakah jenis karangan yang menceritakan peristiwa?',
                    questionMalay: 'Apakah jenis karangan yang menceritakan peristiwa?',
                    options: [
                        { text: 'Karangan naratif', correct: true },
                        { text: 'Karangan deskriptif', correct: false },
                        { text: 'Karangan persuasif', correct: false },
                        { text: 'Karangan ekspositori', correct: false }
                    ],
                    explanation: 'Karangan naratif menceritakan peristiwa atau cerita!',
                    explanationMalay: 'Karangan naratif menceritakan peristiwa atau cerita!'
                },
                {
                    id: 5,
                    type: 'multiple-choice',
                    question: 'Manakah yang betul untuk mengakhiri karangan?',
                    questionMalay: 'Manakah yang betul untuk mengakhiri karangan?',
                    options: [
                        { text: 'Kesimpulan yang merumuskan isi utama', correct: true },
                        { text: 'Ayat baru tanpa kaitan', correct: false },
                        { text: 'Soalan tanpa jawapan', correct: false },
                        { text: 'Nombor sahaja', correct: false }
                    ],
                    explanation: 'Penutup karangan harus merumuskan isi utama dengan baik!',
                    explanationMalay: 'Penutup karangan harus merumuskan isi utama dengan baik!'
                }
            ]
        },
        {
            id: 'sci_6_01',
            subject: 'science',
            title: 'Earth & Space Science',
            titleMalay: 'Sains Bumi & Angkasa',
            yearLevel: 6,
            ageRange: '12',
            difficulty: 'advanced',
            description: 'Learn about Earth, planets, and the solar system',
            descriptionMalay: 'Belajar tentang Bumi, planet, dan sistem suria',
            icon: 'globe',
            xpReward: 100,
            estimatedTime: '35 minutes',
            totalQuestions: 5,
            unlocked: false,
            prerequisites: ['sci_5_01'],
            questions: [
                {
                    id: 1,
                    type: 'multiple-choice',
                    question: 'How many planets are in our solar system?',
                    questionMalay: 'Berapa banyak planet dalam sistem suria kita?',
                    options: [
                        { text: '7', correct: false },
                        { text: '8', correct: true },
                        { text: '9', correct: false },
                        { text: '10', correct: false }
                    ],
                    explanation: 'Our solar system has 8 planets: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune!',
                    explanationMalay: 'Sistem suria kita ada 8 planet: Utarid, Zuhrah, Bumi, Marikh, Musytari, Zuhal, Uranus, Neptun!'
                },
                {
                    id: 2,
                    type: 'multiple-choice',
                    question: 'What causes day and night?',
                    questionMalay: 'Apakah yang menyebabkan siang dan malam?',
                    options: [
                        { text: "Earth's rotation on its axis", correct: true },
                        { text: "Earth's revolution around the sun", correct: false },
                        { text: 'The moon moving', correct: false },
                        { text: 'Stars twinkling', correct: false }
                    ],
                    explanation: 'Day and night happen because Earth rotates (spins) on its axis!',
                    explanationMalay: 'Siang dan malam berlaku kerana Bumi berputar pada paksinya!'
                },
                {
                    id: 3,
                    type: 'true-false',
                    question: 'The sun is a star.',
                    questionMalay: 'Matahari ialah bintang.',
                    correctAnswer: true,
                    explanation: 'True! The sun is a star at the center of our solar system!',
                    explanationMalay: 'Betul! Matahari ialah bintang di tengah sistem suria kita!'
                },
                {
                    id: 4,
                    type: 'multiple-choice',
                    question: 'What are the four seasons?',
                    questionMalay: 'Apakah empat musim?',
                    options: [
                        { text: 'Spring, Summer, Autumn, Winter', correct: true },
                        { text: 'Hot, Cold, Warm, Cool', correct: false },
                        { text: 'Day, Night, Morning, Evening', correct: false },
                        { text: 'North, South, East, West', correct: false }
                    ],
                    explanation: 'The four seasons are Spring, Summer, Autumn (Fall), and Winter!',
                    explanationMalay: 'Empat musim ialah Musim Bunga, Musim Panas, Musim Luruh, dan Musim Sejuk!'
                },
                {
                    id: 5,
                    type: 'multiple-choice',
                    question: 'What causes seasons on Earth?',
                    questionMalay: 'Apakah yang menyebabkan musim di Bumi?',
                    options: [
                        { text: "Earth's tilt and revolution around the sun", correct: true },
                        { text: "Earth's distance from the sun", correct: false },
                        { text: 'The moon', correct: false },
                        { text: 'Rain only', correct: false }
                    ],
                    explanation: 'Seasons are caused by Earth\'s tilt as it revolves around the sun!',
                    explanationMalay: 'Musim disebabkan oleh kecondongan Bumi ketika ia mengelilingi matahari!'
                }
            ]
        }
    ],

    // Helper functions to get modules
    getModuleById: function(moduleId) {
        return this.modules.find(m => m.id === moduleId);
    },

    getModulesBySubject: function(subject) {
        return this.modules.filter(m => m.subject === subject);
    },

    getModulesByYear: function(yearLevel) {
        return this.modules.filter(m => m.yearLevel === yearLevel);
    },

    getUnlockedModules: function(completedModules = []) {
        return this.modules.filter(module => {
            // Module is unlocked if it has no prerequisites or all prerequisites are completed
            if (module.unlocked) return true;
            if (!module.prerequisites || module.prerequisites.length === 0) return false;
            return module.prerequisites.every(prereq => completedModules.includes(prereq));
        });
    },

    getAllUnlockedModules: function(completedModules = []) {
        return this.modules.filter(module => {
            if (module.unlocked) return true;
            if (!module.prerequisites) return false;
            return module.prerequisites.every(prereq => completedModules.includes(prereq));
        });
    },

    getRecommendedModules: function(completedModules = []) {
        // Get next modules to learn based on completed ones
        const allUnlocked = this.getAllUnlockedModules(completedModules);
        return allUnlocked.filter(m => !completedModules.includes(m.id));
    },

    // Get module progress (if stored in localStorage or passed)
    getModuleProgress: function(moduleId) {
        const stored = localStorage.getItem(`module_progress_${moduleId}`);
        if (stored) {
            return JSON.parse(stored);
        }
        return {
            completed: false,
            questionsAnswered: 0,
            correctAnswers: 0,
            xpEarned: 0,
            lastAttempt: null
        };
    },

    // Save module progress
    saveModuleProgress: function(moduleId, progress) {
        localStorage.setItem(`module_progress_${moduleId}`, JSON.stringify(progress));
    },

    // Check if module is completed
    isModuleCompleted: function(moduleId) {
        const progress = this.getModuleProgress(moduleId);
        return progress.completed === true;
    },

    // Get all completed modules
    getCompletedModules: function() {
        const completed = [];
        this.modules.forEach(module => {
            if (this.isModuleCompleted(module.id)) {
                completed.push(module.id);
            }
        });
        return completed;
    },

    // Calculate total XP earned
    getTotalXP: function() {
        const completed = this.getCompletedModules();
        let totalXP = 0;
        completed.forEach(moduleId => {
            const module = this.getModuleById(moduleId);
            if (module) {
                totalXP += module.xpReward;
            }
        });
        return totalXP;
    },

    // Get modules for a specific age
    getModulesForAge: function(age) {
        return this.modules.filter(module => {
            const [minAge, maxAge] = module.ageRange.split('-').map(Number);
            return age >= minAge && age <= maxAge;
        });
    },

    // ==================== YEAR-LEVEL PROGRESSION SYSTEM ====================
    // Prevent students from skipping years by requiring completion of previous year
    
    // Check if a year level is unlocked based on completion percentage
    isYearUnlocked: function(yearLevel, completedModules = []) {
        // Year 1 is always unlocked
        if (yearLevel === 1) return true;
        
        // Check previous year completion
        const previousYear = yearLevel - 1;
        const previousYearModules = this.getModulesByYear(previousYear);
        
        if (previousYearModules.length === 0) return false;
        
        // Count completed modules in previous year
        const completedInPreviousYear = previousYearModules.filter(
            m => completedModules.includes(m.id)
        ).length;
        
        // Require at least 70% completion of previous year to unlock next year
        const requiredCompletion = Math.ceil(previousYearModules.length * 0.7);
        return completedInPreviousYear >= requiredCompletion;
    },

    // Get year-level progress (completed / total modules)
    getYearProgress: function(yearLevel, completedModules = []) {
        const yearModules = this.getModulesByYear(yearLevel);
        if (yearModules.length === 0) return { completed: 0, total: 0, percentage: 0 };
        
        const completed = yearModules.filter(m => completedModules.includes(m.id)).length;
        const percentage = Math.round((completed / yearModules.length) * 100);
        
        return {
            completed: completed,
            total: yearModules.length,
            percentage: percentage
        };
    },

    // Get modules that are actually unlockable (considering both prerequisites AND year gates)
    getUnlockableModules: function(completedModules = []) {
        return this.modules.filter(module => {
            // Check year-level gate first
            if (!this.isYearUnlocked(module.yearLevel, completedModules)) {
                return false;
            }
            
            // Check if module is explicitly unlocked (and year is unlocked)
            if (module.unlocked) {
                return true;
            }
            
            // Check prerequisites
            if (!module.prerequisites || module.prerequisites.length === 0) {
                return false;
            }
            
            return module.prerequisites.every(prereq => 
                completedModules.includes(prereq)
            );
        });
    },

    // Get modules by year and subject
    getModulesByYearAndSubject: function(yearLevel, subject) {
        return this.modules.filter(m => 
            m.yearLevel === yearLevel && m.subject === subject
        );
    },

    // Check how many modules needed to unlock next year
    getModulesNeededForNextYear: function(currentYear, completedModules = []) {
        const currentYearModules = this.getModulesByYear(currentYear);
        if (currentYearModules.length === 0) return 0;
        
        const completed = currentYearModules.filter(
            m => completedModules.includes(m.id)
        ).length;
        
        const requiredCompletion = Math.ceil(currentYearModules.length * 0.7);
        const needed = Math.max(0, requiredCompletion - completed);
        
        return needed;
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = KSSRModules;
}

