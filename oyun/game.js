// Yiğit Alp Ritmik Sayma Macera Oyunu - Core Game Engine

class RhythmicGame {
  constructor() {
    this.currentMode = 'menu';
    this.selectedNumber = '6'; // '6', '7', '8', 'all'
    
    // Persistent stats
    this.totalStars = parseInt(localStorage.getItem('yigit_stars') || '0', 10);
    this.highScore = parseInt(localStorage.getItem('yigit_highscore') || '0', 10);
    
    // Mode specific runtime states
    this.rocketStep = 1;
    this.rocketTarget = 10;
    
    this.detectiveRound = 1;
    this.detectiveScore = 0;
    
    this.timerTime = 60;
    this.timerInterval = null;
    this.timerScore = 0;
    this.timerCombo = 1;
    this.timerConsecutive = 0;
    
    this.tfLives = 3;
    this.tfScore = 0;
    this.tfRound = 1;

    this.currentAnswer = null;
    this.tfCurrentIsCorrect = false;

    this.initDOM();
    this.updateStatsDisplay();
  }

  initDOM() {
    // Stat elements
    this.starDisplay = document.getElementById('total-stars-val');
    this.highScoreDisplay = document.getElementById('high-score-val');
    this.soundToggleBtn = document.getElementById('sound-toggle-btn');

    // Views
    this.viewMenu = document.getElementById('view-menu');
    this.viewRocket = document.getElementById('view-rocket');
    this.viewDetective = document.getElementById('view-detective');
    this.viewTimer = document.getElementById('view-timer');
    this.viewTF = document.getElementById('view-tf');

    // Modals
    this.resultModal = document.getElementById('result-modal');
    this.certModal = document.getElementById('cert-modal');

    // Setup number filter buttons
    document.querySelectorAll('.filter-pill').forEach(btn => {
      btn.addEventListener('click', (e) => {
        sounds.playClick();
        document.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        this.selectedNumber = e.target.dataset.num;
        this.restartCurrentMode();
      });
    });

    // Sound toggle
    if (this.soundToggleBtn) {
      this.soundToggleBtn.addEventListener('click', () => {
        const isMuted = sounds.toggleMute();
        this.soundToggleBtn.textContent = isMuted ? '🔇' : '🔊';
      });
    }

    // Bind keyboard shortcut for accessibility
    window.addEventListener('keydown', (e) => {
      if (this.currentMode === 'truefalse') {
        if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowLeft') {
          this.handleTFAnswer(true);
        } else if (e.key === 'y' || e.key === 'Y' || e.key === 'ArrowRight') {
          this.handleTFAnswer(false);
        }
      }
    });
  }

  updateStatsDisplay() {
    if (this.starDisplay) this.starDisplay.textContent = this.totalStars;
    if (this.highScoreDisplay) this.highScoreDisplay.textContent = this.highScore;
  }

  addStars(count) {
    this.totalStars += count;
    localStorage.setItem('yigit_stars', this.totalStars);
    this.updateStatsDisplay();
  }

  setHighScore(newScore) {
    if (newScore > this.highScore) {
      this.highScore = newScore;
      localStorage.setItem('yigit_highscore', this.highScore);
      this.updateStatsDisplay();
      return true;
    }
    return false;
  }

  showView(viewId) {
    document.querySelectorAll('.game-view').forEach(v => v.classList.remove('active'));
    const target = document.getElementById(viewId);
    if (target) target.classList.add('active');
  }

  goToMenu() {
    sounds.playClick();
    this.clearTimer();
    this.currentMode = 'menu';
    this.showView('view-menu');
  }

  getActiveStepSize() {
    if (this.selectedNumber === 'all') {
      const nums = [6, 7, 8];
      return nums[Math.floor(Math.random() * nums.length)];
    }
    return parseInt(this.selectedNumber, 10);
  }

  restartCurrentMode() {
    if (this.currentMode === 'rocket') this.startRocketMode();
    else if (this.currentMode === 'detective') this.startDetectiveMode();
    else if (this.currentMode === 'timer60') this.startTimerMode();
    else if (this.currentMode === 'truefalse') this.startTFMode();
  }

  /* ========================================================
     MOD 1: ROKET FIRLATMA (ADIM ADIM SAYMA)
  ======================================================== */
  startRocketMode() {
    sounds.playClick();
    this.currentMode = 'rocket';
    this.rocketStep = 1;
    this.showView('view-rocket');
    this.renderRocketQuestion();
  }

  renderRocketQuestion() {
    const stepSize = this.getActiveStepSize();
    const currentVal = this.rocketStep * stepSize;
    const nextVal = (this.rocketStep + 1) * stepSize;
    this.currentAnswer = nextVal;

    // Update Progress Track
    const progressPercent = (this.rocketStep / this.rocketTarget) * 100;
    const progressFill = document.getElementById('rocket-progress-fill');
    const rocketSprite = document.getElementById('rocket-sprite');
    if (progressFill) progressFill.style.width = `${progressPercent}%`;
    if (rocketSprite) rocketSprite.style.left = `calc(${progressPercent}% - 30px)`;

    // Update Title & Prompt
    const promptElem = document.getElementById('rocket-prompt');
    if (promptElem) {
      if (this.rocketStep === 1) {
        promptElem.innerHTML = `🚀 <strong>${stepSize}'şar</strong> sayıyoruz! <br>İlk basamak <strong>${currentVal}</strong>. Sıradaki basamak nedir?`;
      } else {
        promptElem.innerHTML = `🚀 Adım ${this.rocketStep} tamam: <strong>${currentVal}</strong>!<br>Sıradaki <strong>${stepSize}'şar</strong> basamak nedir?`;
      }
    }

    // Generate Options
    const options = this.generateOptions(nextVal, stepSize);
    this.renderOptionsGrid('rocket-options-grid', options, (choice, btn) => {
      this.handleRocketAnswer(choice, btn);
    });
  }

  handleRocketAnswer(choice, btn) {
    if (choice === this.currentAnswer) {
      btn.classList.add('correct');
      sounds.playSuccess();
      this.rocketStep++;

      if (this.rocketStep >= this.rocketTarget) {
        // ROCKET LAUNCHED! VICTORY!
        setTimeout(() => {
          sounds.playRocket();
          setTimeout(() => sounds.playFanfare(), 400);
          confetti.fire(150);
          this.addStars(3);
          this.showResultModal('🚀 ROKET UZAYA FIRLADI!', 'Harikasın Yiğit Alp! Tüm ritmik basamakları doğru tamamlayıp roketi yıldızlara ulaştırdın!', 3);
        }, 500);
      } else {
        setTimeout(() => {
          this.renderRocketQuestion();
        }, 550);
      }
    } else {
      btn.classList.add('wrong');
      sounds.playError();
      setTimeout(() => {
        btn.classList.remove('wrong');
      }, 500);
    }
  }

  /* ========================================================
     MOD 2: KAYIP SAYI DEDEKTİFİ
  ======================================================== */
  startDetectiveMode() {
    sounds.playClick();
    this.currentMode = 'detective';
    this.detectiveRound = 1;
    this.detectiveScore = 0;
    this.showView('view-detective');
    this.renderDetectiveQuestion();
  }

  renderDetectiveQuestion() {
    const stepSize = this.getActiveStepSize();
    const isBackward = Math.random() > 0.65; // Sometimes backwards
    const startMultiplier = Math.floor(Math.random() * 5) + (isBackward ? 5 : 1);
    
    // Generate 4 consecutive numbers
    const sequence = [];
    for (let i = 0; i < 4; i++) {
      const mult = isBackward ? (startMultiplier - i) : (startMultiplier + i);
      sequence.push(Math.max(stepSize, mult * stepSize));
    }

    // Pick random index to hide (0 to 3)
    const missingIdx = Math.floor(Math.random() * 4);
    this.currentAnswer = sequence[missingIdx];

    // Render Sequence Elements
    const container = document.getElementById('detective-sequence-container');
    if (container) {
      container.innerHTML = sequence.map((val, idx) => {
        if (idx === missingIdx) {
          return `<div class="seq-item missing">?</div>`;
        }
        return `<div class="seq-item">${val}</div>`;
      }).join('<span style="font-size:1.5rem; color:#94a3b8; font-weight:bold;">➜</span>');
    }

    const roundElem = document.getElementById('detective-round-text');
    if (roundElem) roundElem.textContent = `Soru ${this.detectiveRound} / 10`;

    // Options
    const options = this.generateOptions(this.currentAnswer, stepSize);
    this.renderOptionsGrid('detective-options-grid', options, (choice, btn) => {
      this.handleDetectiveAnswer(choice, btn);
    });
  }

  handleDetectiveAnswer(choice, btn) {
    if (choice === this.currentAnswer) {
      btn.classList.add('correct');
      sounds.playSuccess();
      this.detectiveScore += 10;
    } else {
      btn.classList.add('wrong');
      sounds.playError();
    }

    this.detectiveRound++;
    setTimeout(() => {
      if (this.detectiveRound > 10) {
        const stars = this.detectiveScore >= 80 ? 3 : (this.detectiveScore >= 50 ? 2 : 1);
        this.addStars(stars);
        sounds.playFanfare();
        confetti.fire(100);
        this.showResultModal('🔍 DEDEKTİF GÖREVİ TAMAMLANDI!', `Yiğit Alp, 10 soruda ${this.detectiveScore} puan aldın!`, stars);
      } else {
        this.renderDetectiveQuestion();
      }
    }, 600);
  }

  /* ========================================================
     MOD 3: 60 SANİYE ŞAMPİYONU (ZAMANLA YARIŞ)
  ======================================================== */
  startTimerMode() {
    sounds.playClick();
    this.currentMode = 'timer60';
    this.timerTime = 60;
    this.timerScore = 0;
    this.timerCombo = 1;
    this.timerConsecutive = 0;
    this.showView('view-timer');
    this.updateTimerDisplay();
    this.renderTimerQuestion();

    this.clearTimer();
    this.timerInterval = setInterval(() => {
      this.timerTime--;
      this.updateTimerDisplay();
      if (this.timerTime <= 0) {
        this.endTimerMode();
      }
    }, 1000);
  }

  clearTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  updateTimerDisplay() {
    const timerCircle = document.getElementById('timer-seconds-circle');
    const scoreElem = document.getElementById('timer-score-text');
    const comboElem = document.getElementById('timer-combo-badge');

    if (timerCircle) {
      timerCircle.textContent = this.timerTime;
      if (this.timerTime <= 10) {
        timerCircle.classList.add('danger');
      } else {
        timerCircle.classList.remove('danger');
      }
    }
    if (scoreElem) scoreElem.textContent = `Puan: ${this.timerScore}`;
    if (comboElem) comboElem.textContent = `Seri Çarpanı: x${this.timerCombo}`;
  }

  renderTimerQuestion() {
    const stepSize = this.getActiveStepSize();
    const mult = Math.floor(Math.random() * 9) + 2; // 2..10
    const questionType = Math.random();

    let promptText = '';
    let answerVal = 0;

    if (questionType < 0.5) {
      // Çarpma formatı
      promptText = `⚡ ${mult} × ${stepSize} = ?`;
      answerVal = mult * stepSize;
    } else {
      // Ritmik adım formatı
      const prev = (mult - 1) * stepSize;
      promptText = `⚡ ${stepSize}'şar sayarken <strong>${prev}</strong> sayısından sonra ne gelir?`;
      answerVal = mult * stepSize;
    }

    this.currentAnswer = answerVal;
    const promptElem = document.getElementById('timer-prompt-text');
    if (promptElem) promptElem.innerHTML = promptText;

    const options = this.generateOptions(answerVal, stepSize);
    this.renderOptionsGrid('timer-options-grid', options, (choice, btn) => {
      this.handleTimerAnswer(choice, btn);
    });
  }

  handleTimerAnswer(choice, btn) {
    if (choice === this.currentAnswer) {
      btn.classList.add('correct');
      sounds.playSuccess();
      this.timerConsecutive++;
      if (this.timerConsecutive >= 5) this.timerCombo = 3;
      else if (this.timerConsecutive >= 3) this.timerCombo = 2;
      else this.timerCombo = 1;

      this.timerScore += 10 * this.timerCombo;
    } else {
      btn.classList.add('wrong');
      sounds.playError();
      this.timerConsecutive = 0;
      this.timerCombo = 1;
    }

    this.updateTimerDisplay();
    setTimeout(() => {
      if (this.timerTime > 0) {
        this.renderTimerQuestion();
      }
    }, 450);
  }

  endTimerMode() {
    this.clearTimer();
    sounds.playFanfare();
    confetti.fire(120);

    const isNewRecord = this.setHighScore(this.timerScore);
    const stars = this.timerScore >= 120 ? 3 : (this.timerScore >= 60 ? 2 : 1);
    this.addStars(stars);

    const msg = isNewRecord 
      ? `🎉 TEBRİKLER YİĞİT ALP! YENİ REKOR KIRDIN: ${this.timerScore} PUAN!`
      : `Süre Doldu! Skorun: ${this.timerScore} Puan.`;

    this.showResultModal('⏱️ 60 SANİYE MARATONU BİTTİ!', msg, stars);
  }

  /* ========================================================
     MOD 4: DOĞRU MU YANLIŞ MI? (HIZLI REFLEKS)
  ======================================================== */
  startTFMode() {
    sounds.playClick();
    this.currentMode = 'truefalse';
    this.tfLives = 3;
    this.tfScore = 0;
    this.tfRound = 1;
    this.showView('view-tf');
    this.updateTFHeader();
    this.renderTFQuestion();
  }

  updateTFHeader() {
    const heartsElem = document.getElementById('tf-hearts-container');
    const scoreElem = document.getElementById('tf-score-val');
    if (heartsElem) {
      let heartsHtml = '';
      for (let i = 0; i < 3; i++) {
        heartsHtml += (i < this.tfLives) ? '❤️' : '🖤';
      }
      heartsElem.innerHTML = heartsHtml;
    }
    if (scoreElem) scoreElem.textContent = this.tfScore;
  }

  renderTFQuestion() {
    const stepSize = this.getActiveStepSize();
    const mult = Math.floor(Math.random() * 8) + 2; // 2..9
    const isReallyCorrect = Math.random() > 0.5;
    this.tfCurrentIsCorrect = isReallyCorrect;

    const correctProduct = mult * stepSize;
    let displayedProduct = correctProduct;
    if (!isReallyCorrect) {
      // Pick a deceptive wrong answer (e.g. ± stepSize or ± 2)
      const offsets = [-stepSize, stepSize, -2, 2, -4, 4];
      const offset = offsets[Math.floor(Math.random() * offsets.length)];
      displayedProduct = Math.max(stepSize, correctProduct + offset);
      if (displayedProduct === correctProduct) displayedProduct += stepSize;
    }

    const questionType = Math.random();
    let statement = '';
    if (questionType < 0.5) {
      statement = `"${stepSize}'şar ritmik saymada ${mult}. adım <strong>${displayedProduct}</strong> sayısıdır."`;
    } else {
      statement = `"${mult} × ${stepSize} işleminin sonucu <strong>${displayedProduct}</strong> sayısıdır."`;
    }

    const statementElem = document.getElementById('tf-statement-text');
    if (statementElem) statementElem.innerHTML = statement;
  }

  handleTFAnswer(userChoiceBool) {
    if (userChoiceBool === this.tfCurrentIsCorrect) {
      sounds.playSuccess();
      this.tfScore += 10;
    } else {
      sounds.playError();
      this.tfLives--;
    }

    this.tfRound++;
    this.updateTFHeader();

    if (this.tfLives <= 0 || this.tfRound > 15) {
      setTimeout(() => {
        const stars = this.tfScore >= 100 ? 3 : (this.tfScore >= 60 ? 2 : 1);
        this.addStars(stars);
        sounds.playFanfare();
        confetti.fire(100);
        this.showResultModal('⚖️ REFLEKS MEYDAN OKUMASI BİTTİ', `Yiğit Alp, toplam ${this.tfScore} puan topladın!`, stars);
      }, 400);
    } else {
      setTimeout(() => {
        this.renderTFQuestion();
      }, 400);
    }
  }

  /* ========================================================
     HELPER: RENDER BUTTON GRIDS & GENERATE CHOICES
  ======================================================== */
  generateOptions(correctVal, stepSize) {
    const options = new Set([correctVal]);
    const distractors = [
      correctVal + stepSize,
      correctVal - stepSize,
      correctVal + (stepSize * 2),
      correctVal - (stepSize * 2),
      correctVal + 2,
      correctVal - 2,
      correctVal + 4
    ].filter(v => v > 0 && v !== correctVal);

    while (options.size < 4 && distractors.length > 0) {
      const randIdx = Math.floor(Math.random() * distractors.length);
      options.add(distractors.splice(randIdx, 1)[0]);
    }

    // Convert to array and shuffle
    return Array.from(options).sort(() => Math.random() - 0.5);
  }

  renderOptionsGrid(containerId, options, onClickCallback) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'btn-option';
      btn.textContent = opt;
      btn.onclick = () => onClickCallback(opt, btn);
      container.appendChild(btn);
    });
  }

  /* ========================================================
     MODALS: RESULT & CERTIFICATE
  ======================================================== */
  showResultModal(title, desc, starsCount = 3) {
    const starString = '⭐'.repeat(starsCount) + '☆'.repeat(3 - starsCount);
    document.getElementById('modal-title-text').textContent = title;
    document.getElementById('modal-desc-text').textContent = desc;
    document.getElementById('modal-score-display').textContent = `Kazanılan: ${starString}`;
    this.resultModal.classList.add('active');
  }

  closeResultModal() {
    sounds.playClick();
    this.resultModal.classList.remove('active');
    this.goToMenu();
  }

  openCertificate() {
    sounds.playClick();
    sounds.playFanfare();
    confetti.fire(120);
    
    // Set current date in Turkish format
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateStr = today.toLocaleDateString('tr-TR', options);
    
    document.getElementById('cert-date').textContent = `Tarih: ${dateStr}`;
    document.getElementById('cert-star-count').textContent = `Kazanılan Yıldız: ${this.totalStars} ⭐ | Rekor: ${this.highScore} Puan`;
    this.certModal.classList.add('active');
  }

  closeCertificate() {
    sounds.playClick();
    this.certModal.classList.remove('active');
  }

  printCertificate() {
    window.print();
  }
}

// Global instance
window.game = null;
window.addEventListener('DOMContentLoaded', () => {
  window.game = new RhythmicGame();
});
