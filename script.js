//為求方便，程式註解由AI生成，程式本體為我自行撰寫
// =================================================================
// DOM 元素獲取
// =================================================================
const welcomeScreen = document.getElementById('welcome-screen');
const spreadSelectionScreen = document.getElementById('spread-selection-screen');
const divinationScreen = document.getElementById('divination-screen');
const userQuestionInput = document.getElementById('user-question');
const submitQuestionBtn = document.getElementById('submit-question-btn');
const spreadOptions = document.querySelector('.spread-options');
const cardDisplayArea = document.getElementById('card-display-area');
const interpretationArea = document.getElementById('interpretation-area');
const aiInterpretation = document.getElementById('ai-interpretation');
const loader = document.querySelector('.loader-container');
const resetBtn = document.getElementById('reset-btn');
const questionDisplay = document.getElementById('question-display');
const selectionInstructions = document.getElementById('selection-instructions');
const autoPickBtn = document.getElementById('auto-pick-btn');
const confirmSelectionBtn = document.getElementById('confirm-selection-btn');

// =================================================================
// 卡牌數據 
// =================================================================
const cardDeck = [
    // A. 情感組
    { name: '心形項鍊', group: '情感', upright: '愛情、關懷', reversed: '失戀、冷漠' },
    { name: '蠟燭', group: '情感', upright: '希望、溫暖', reversed: '黑暗、絕望' },
    { name: '書信', group: '情感', upright: '溝通、秘密', reversed: '誤會、謊言' },
    { name: '玫瑰', group: '情感', upright: '美麗、浪漫', reversed: '虛偽、欺騙' },
    { name: '鏡子', group: '情感', upright: '自我認知', reversed: '自我懷疑' },
    { name: '鈴鐺', group: '情感', upright: '喚醒、提醒', reversed: '忽視、麻木' },
    { name: '心跳器', group: '情感', upright: '熱情、生命力', reversed: '疲憊、冷淡' },
    { name: '眼鏡', group: '情感', upright: '清晰、真相', reversed: '模糊、迷惘' },
    { name: '鋼琴', group: '情感', upright: '藝術、靈感', reversed: '阻塞、疲乏' },
    { name: '手鍊', group: '情感', upright: '約束、連結', reversed: '鬆散、斷裂' },
    { name: '花束', group: '情感', upright: '禮物、祝福', reversed: '虛假、欺騙' },
    { name: '鳥籠', group: '情感', upright: '限制、保護', reversed: '逃避、壓迫' },
    { name: '水瓶', group: '情感', upright: '情感流動', reversed: '混亂、冷漠' },
    { name: '羽毛', group: '情感', upright: '輕盈、自由', reversed: '脆弱、逃避' },
    // B. 物質組
    { name: '錢包', group: '物質', upright: '財富、資源', reversed: '浪費、貧窮' },
    { name: '鑰匙', group: '物質', upright: '機會、解決方案', reversed: '閉鎖、無助' },
    { name: '錶', group: '物質', upright: '時間管理', reversed: '拖延、浪費' },
    { name: '箱子', group: '物質', upright: '儲藏、秘密', reversed: '隱藏、囤積' },
    { name: '車', group: '物質', upright: '旅程、掌控', reversed: '失控、遲滯' },
    { name: '電腦', group: '物質', upright: '知識、效率', reversed: '過度依賴、失焦' },
    { name: '眼鏡', group: '物質', upright: '清晰、視野', reversed: '視野狹窄' },
    { name: '手機', group: '物質', upright: '聯繫、信息', reversed: '干擾、分心' },
    { name: '燈泡', group: '物質', upright: '靈感、創新', reversed: '阻礙、迷失' },
    { name: '錘子', group: '物質', upright: '建設、力量', reversed: '破壞、固執' },
    { name: '筆', group: '物質', upright: '表達、記錄', reversed: '沉默、忘記' },
    { name: '繩子', group: '物質', upright: '綁定、連結', reversed: '束縛、限制' },
    { name: '眼罩', group: '物質', upright: '隱藏、休息', reversed: '逃避、無知' },
    { name: '帽子', group: '物質', upright: '身份、角色', reversed: '偽裝、虛假' },
    // C. 思想組
    { name: '書', group: '思想', upright: '知識、學習', reversed: '無知、偏見' },
    { name: '鉛筆', group: '思想', upright: '創造、計劃', reversed: '拖延、失敗' },
    { name: '地圖', group: '思想', upright: '指引、方向', reversed: '迷失、困惑' },
    { name: '鐘錶', group: '思想', upright: '時間、節奏', reversed: '慌亂、拖延' },
    { name: '放大鏡', group: '思想', upright: '分析、專注', reversed: '過度挑剔' },
    { name: '眼罩', group: '思想', upright: '內省、休息', reversed: '逃避現實' },
    { name: '雨傘', group: '思想', upright: '保護、防禦', reversed: '脆弱、曝露' },
    { name: '筆記本', group: '思想', upright: '記錄、計畫', reversed: '混亂、忘記' },
    { name: '磁鐵', group: '思想', upright: '吸引、影響', reversed: '排斥、疏離' },
    { name: '電燈', group: '思想', upright: '啟發、靈感', reversed: '阻礙、黑暗' },
    { name: '眼鏡', group: '思想', upright: '清晰、真相', reversed: '迷惑、誤判' },
    { name: '沙漏', group: '思想', upright: '流逝、警示', reversed: '浪費、拖延' },
    { name: '鐵鏈', group: '思想', upright: '約束、限制', reversed: '解放、混亂' },
    { name: '蜡燭', group: '思想', upright: '指引、希望', reversed: '熄滅、絕望' },
    // D. 行動組
    { name: '鞋子', group: '行動', upright: '前進、行動', reversed: '停滯、猶豫' },
    { name: '地圖', group: '行動', upright: '計畫、方向', reversed: '迷失、猶豫' },
    { name: '繩索', group: '行動', upright: '連結、束縛', reversed: '解脫、破裂' },
    { name: '火把', group: '行動', upright: '引領、熱情', reversed: '熄滅、冷卻' },
    { name: '鐵鎚', group: '行動', upright: '力量、建設', reversed: '破壞、衝動' },
    { name: '車輪', group: '行動', upright: '運轉、進展', reversed: '停滯、不穩' },
    { name: '飛鏢', group: '行動', upright: '目標、精準', reversed: '偏差、失誤' },
    { name: '背包', group: '行動', upright: '準備、負擔', reversed: '拖累、負擔過重' },
    { name: '鐵鍊', group: '行動', upright: '約束、連結', reversed: '釋放、自由' },
    { name: '劍', group: '行動', upright: '力量、決斷', reversed: '衝動、爭鬥' },
    { name: '鐘', group: '行動', upright: '時間、決心', reversed: '拖延、猶豫' },
    { name: '船', group: '行動', upright: '旅程、探索', reversed: '停滯、迷航' },
    { name: '繩結', group: '行動', upright: '連結、合作', reversed: '分離、矛盾' },
    { name: '旗幟', group: '行動', upright: '目標、信念', reversed: '迷失、放棄' },
    //E. 靈性組
    { name: '老虎', group: '靈性', upright: '勇氣、力量、領導力', reversed: '輕率、暴怒、失控' },
    { name: '貓頭鷹', group: '靈性', upright: '智慧、洞察、冷靜', reversed: '偏執、孤立、誤判' },
    { name: '烏龜', group: '靈性', upright: '穩健、耐心、長壽', reversed: '拖延、退縮、不願改變' },
    { name: '獅子', group: '靈性', upright: '自信、榮耀、權威', reversed: '驕傲、自大、霸道' },
    { name: '狐狸', group: '靈性', upright: '狡猾、機智、適應力', reversed: '詭計多端、背叛、欺騙' },
    { name: '大象', group: '靈性', upright: '堅定、記憶力強、守護', reversed: '頑固、固執、無法放下' },
    { name: '海豚', group: '靈性', upright: '溫柔、社交、智慧', reversed: '膚淺、依賴、缺乏方向' },
    { name: '蜜蜂', group: '靈性', upright: '勤奮、團隊合作、甜蜜', reversed: '過勞、過度工作、緊張' },
    { name: '蛇', group: '靈性', upright: '轉變、治癒、神秘', reversed: '危險、背叛、誘惑' },
    { name: '鷹', group: '靈性', upright: '自由、高瞻遠矚、目標明確', reversed: '狹隘、傲慢、失焦' },
    { name: '熊', group: '靈性', upright: '力量、保護、耐力', reversed: '過度防衛、沉默、懶惰' },
    { name: '兔子', group: '靈性', upright: '警覺、敏捷、繁衍', reversed: '膽小、逃避、猶豫' },
    { name: '海龜', group: '靈性', upright: '穩定、長壽、智慧', reversed: '拖延、退縮、害怕變動' },
    { name: '鯨魚', group: '靈性', upright: '深層感情、溝通、智慧', reversed: '情緒壓抑、孤獨、逃避' },
    { name: '鴿子', group: '靈性', upright: '和平、愛、希望', reversed: '鬥爭、失望、背叛' },
    { name: '狼', group: '靈性', upright: '群體、直覺、忠誠', reversed: '孤獨、懷疑、失信' },
    { name: '青蛙', group: '靈性', upright: '變化、清潔、新開始', reversed: '抵抗變化、停滯、不潔' },
    { name: '猴子', group: '靈性', upright: '聰明、調皮、靈活', reversed: '不負責任、欺騙、分心' },
    { name: '蝴蝶', group: '靈性', upright: '轉變、美麗、自由', reversed: '不安、脆弱、短暫' },
    { name: '海馬', group: '靈性', upright: '穩定、耐心、家庭', reversed: '脆弱、依賴、逃避現實' },
    { name: '龍', group: '靈性', upright: '力量、神秘、保護', reversed: '傲慢、破壞、暴怒' },
    { name: '猫', group: '靈性', upright: '自由、獨立、神秘', reversed: '冷漠、孤立、懶散' },
];

const spreadDetails = {
    'single': { name: '單牌占卜', count: 1, positions: ['整體建議'] },
    'three-card': { name: '三張牌法', count: 3, positions: ['過去背景', '當下狀態', '未來可能'] },
    'cross': { name: '十字牌法', count: 5, positions: ['主題核心', '阻礙因素', '助力因素', '潛在影響', '最終走向'] },
    'relationship': { name: '關係牌陣', count: 6, positions: ['對方的想法', '你的想法', '關係現況', '關係問題', '改善方法', '最終可能'] },
    'free': { name: '自由抽牌', count: 0, positions: [] }, // count handled dynamically
    'auto': { name: '自動選擇', count: 0, positions: [] } // count handled dynamically
};


// =================================================================
// 應用程式狀態
// =================================================================
let userQuestion = '';
let drawnCards = [];
let currentHistoryId = null; // 紀錄目前正在占卜的歷史 id
let currentSpread = null;
let selectableDeck = [];
let selectedIndexes = new Set();
let requiredPickCount = 0;

// =================================================================
// 事件監聽 
// =================================================================
submitQuestionBtn.addEventListener('click', () => {
    userQuestion = userQuestionInput.value.trim();
    if (userQuestion === '') {
        alert('請先輸入您的問題！');
        return;
    }
    // 建立一筆 pending 紀錄，稍後在 AI 回覆後補上詳細內容
    currentHistoryId = createPendingHistoryEntry(userQuestion);
    switchScreen(spreadSelectionScreen);
});

spreadOptions.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const spreadType = e.target.dataset.spread;
        handleSpreadSelection(spreadType);
    }
});

// 自動抽牌按鈕（在互動選牌階段）
if (autoPickBtn) {
    autoPickBtn.addEventListener('click', () => {
        if (!currentSpread) return;
        autoPickCards();
    });
}

if (confirmSelectionBtn) {
    confirmSelectionBtn.addEventListener('click', () => {
        if (!currentSpread) return;
        if (selectedIndexes.size !== requiredPickCount) {
            alert(`請選擇 ${requiredPickCount} 張牌，目前已選 ${selectedIndexes.size} 張。`);
            return;
        }
        finalizeSelectionAndReveal();
    });
}

resetBtn.addEventListener('click', () => {
    // 重置所有狀態並回到歡迎畫面
    userQuestion = '';
    drawnCards = [];
    userQuestionInput.value = '';
    cardDisplayArea.innerHTML = '';
    aiInterpretation.innerHTML = '';
    interpretationArea.style.display = 'none';
    resetBtn.style.display = 'none';
    switchScreen(welcomeScreen, true);
});

// 檢視詢問紀錄按鈕
const viewHistoryBtn = document.getElementById('view-history-btn');
const historyContainer = document.getElementById('history-container');
const historyList = document.getElementById('history-list');
const clearHistoryBtn = document.getElementById('clear-history-btn');
const closeHistoryBtn = document.getElementById('close-history-btn');

viewHistoryBtn.addEventListener('click', () => {
    showHistory();
});

// 清除紀錄
clearHistoryBtn.addEventListener('click', () => {
    if (!confirm('確定要清除所有詢問紀錄？')) return;
    localStorage.removeItem('divinationHistory');
    showHistory();
});

// 關閉歷史視窗
closeHistoryBtn.addEventListener('click', () => {
    historyContainer.style.display = 'none';
});

// 每日運勢按鈕與容器
const dailyHoroscopeBtn = document.getElementById('daily-horoscope-btn');
const dailyHoroscopeContainer = document.getElementById('daily-horoscope-container');
const dailyHoroscopeContent = document.getElementById('daily-horoscope-content');
const closeHoroscopeBtn = document.getElementById('close-horoscope-btn');

dailyHoroscopeBtn.addEventListener('click', () => {
    showDailyHoroscope();
});

closeHoroscopeBtn.addEventListener('click', () => {
    dailyHoroscopeContainer.style.display = 'none';
});

// =================================================================
// 核心功能函式 
// =================================================================

function switchScreen(screenToShow, isReset = false) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    if (isReset) {
      divinationScreen.classList.remove('active');
    }
    screenToShow.classList.add('active');
}

function handleSpreadSelection(spreadType) {
    let cardCount;
    let selectedSpread = spreadDetails[spreadType];
    
    if (spreadType === 'free') {
        cardCount = parseInt(document.getElementById('free-draw-count').value);
        if (isNaN(cardCount) || cardCount < 1 || cardCount > 10) {
            alert('請輸入1到10之間的數字！');
            return;
        }
        selectedSpread.count = cardCount;
        selectedSpread.positions = Array.from({ length: cardCount }, (_, i) => `第 ${i + 1} 張牌`);

    } else if (spreadType === 'auto') {
        // 真正根據問題內容選擇最適合的牌陣
        const autoChoice = chooseSpreadAutomatically(userQuestion);
        selectedSpread = spreadDetails[autoChoice];
        cardCount = selectedSpread.count;
    } else {
        cardCount = selectedSpread.count;
    }

    switchScreen(divinationScreen);
    questionDisplay.textContent = `問題：「${userQuestion}」`;
    // 初始化互動選牌流程
    currentSpread = selectedSpread;
    requiredPickCount = selectedSpread.count || 3;
    prepareSelectionDeck();
}

function drawAndDisplayCards(spread) {
    const shuffledDeck = [...cardDeck].sort(() => 0.5 - Math.random());
    
    drawnCards = shuffledDeck.slice(0, spread.count).map((card, index) => {
        const isReversed = Math.random() < 0.5;
        return {
            ...card,
            orientation: isReversed ? '逆位' : '正位',
            position: spread.positions[index] || `第 ${index + 1} 張`
        };
    });

    cardDisplayArea.innerHTML = '';
    displayCards(drawnCards);

    getAIInterpretation(spread);
}

// 準備互動選牌用的整副牌（背朝上）
function prepareSelectionDeck() {
    // shuffle full deck
    selectableDeck = [...cardDeck].map((c, i) => ({ ...c, _idx: i })).sort(() => 0.5 - Math.random());
    selectedIndexes = new Set();
    cardDisplayArea.innerHTML = '';
    interpretationArea.style.display = 'none';
    resetBtn.style.display = 'none';
    updateSelectionInstructions();

    // render all cards as backs
    selectableDeck.forEach((card, i) => {
        const cardContainer = document.createElement('div');
        cardContainer.className = 'card-container';
        cardContainer.style.animationDelay = `${(i % 12) * 0.02}s`;
        cardContainer.dataset.deckIndex = i;

        const cardEl = document.createElement('div');
        cardEl.className = 'card';
        cardEl.dataset.index = i;
        cardEl.innerHTML = `
            <div class="card-face card-back"></div>
            <div class="card-face card-front">
                <div class="card-name"></div>
                <div class="card-orientation"></div>
                <div class="card-position"></div>
            </div>
        `;

        cardContainer.appendChild(cardEl);
        cardDisplayArea.appendChild(cardContainer);

        // 點擊選牌
        cardEl.addEventListener('click', () => {
            const idx = Number(cardEl.dataset.index);
            toggleSelectIndex(idx, cardEl);
        });
    });
}

function updateSelectionInstructions() {
    if (!selectionInstructions) return;
    selectionInstructions.textContent = `請從牌面中選擇 ${requiredPickCount} 張牌。已選 ${selectedIndexes.size}/${requiredPickCount}`;
}

function toggleSelectIndex(idx, cardEl) {
    if (selectedIndexes.has(idx)) {
        selectedIndexes.delete(idx);
        cardEl.style.outline = 'none';
        cardEl.style.boxShadow = '';
    } else {
        if (selectedIndexes.size >= requiredPickCount) {
            // 不允許超選
            return;
        }
        selectedIndexes.add(idx);
        cardEl.style.outline = '3px solid #ffeb3b';
        cardEl.style.boxShadow = '0 6px 18px rgba(255,235,59,0.15)';
    }
    updateSelectionInstructions();
}

function autoPickCards() {
    selectedIndexes.clear();
    const total = selectableDeck.length;
    const picks = new Set();
    while (picks.size < requiredPickCount) {
        const r = Math.floor(Math.random() * total);
        picks.add(r);
    }
    picks.forEach(i => selectedIndexes.add(i));

    // 更新 UI
    cardDisplayArea.querySelectorAll('.card').forEach(cardEl => {
        const idx = Number(cardEl.dataset.index);
        if (selectedIndexes.has(idx)) {
            cardEl.style.outline = '3px solid #ffeb3b';
            cardEl.style.boxShadow = '0 6px 18px rgba(255,235,59,0.15)';
        } else {
            cardEl.style.outline = 'none';
            cardEl.style.boxShadow = '';
        }
    });
    updateSelectionInstructions();
}

function finalizeSelectionAndReveal() {
    // Build drawnCards from selections in selected order (order arbitrary based on iteration)
    const selArray = Array.from(selectedIndexes);
    drawnCards = selArray.map((selIdx, i) => {
        const card = selectableDeck[selIdx];
        const isReversed = Math.random() < 0.5;
        return {
            ...card,
            orientation: isReversed ? '逆位' : '正位',
            position: currentSpread.positions[i] || `第 ${i + 1} 張`
        };
    });

    //  flip selected cards and remove non-selected ones
    const cardEls = cardDisplayArea.querySelectorAll('.card');
    // compute stagger delays
    const selList = Array.from(selectedIndexes);
    cardEls.forEach(cardEl => {
        const idx = Number(cardEl.dataset.index);
        const container = cardEl.parentElement;
        const front = cardEl.querySelector('.card-front');
        if (selectedIndexes.has(idx)) {
            const selPos = selList.indexOf(idx);
            const c = drawnCards[selPos];
            // 填入正位/逆位資訊
            front.querySelector('.card-name').textContent = c.name;
            front.querySelector('.card-orientation').textContent = c.orientation;
            front.querySelector('.card-position').textContent = `(${c.position})`;
            // flip with stagger
            setTimeout(() => {
                if (c.orientation === '逆位') {
                    cardEl.classList.add('reversed-draw');
                } else {
                    cardEl.classList.add('flipped');
                }
            }, 200 + selPos * 250);
        } else {
            // fade out and remove non-selected cards
            container.style.transition = 'opacity 350ms ease, transform 350ms ease';
            container.style.opacity = '0';
            container.style.transform = 'scale(0.6)';
            setTimeout(() => {
                if (container && container.parentElement) container.parentElement.removeChild(container);
            }, 400);
        }
    });

    // After reveal animations finish, compact the layout to only selected cards
    const maxRevealDelay = 200 + (selList.length - 1) * 250;
    const cleanupDelay = maxRevealDelay + 700;
    setTimeout(() => {
        // Re-append only selected containers in the selected order
        const frag = document.createDocumentFragment();
        selList.forEach(selIdx => {
            const selContainer = cardDisplayArea.querySelector(`[data-deck-index='${selIdx}']`);
            if (selContainer) frag.appendChild(selContainer);
        });
        cardDisplayArea.innerHTML = '';
        cardDisplayArea.appendChild(frag);

        // 顯示解讀區並呼叫 AI
        interpretationArea.style.display = 'block';
        getAIInterpretation(currentSpread);
    }, cleanupDelay);
}

function displayCards(cards) {
    cards.forEach((card, index) => {
        const cardContainer = document.createElement('div');
        cardContainer.className = 'card-container';
        cardContainer.style.animationDelay = `${index * 0.2}s`;

        const cardEl = document.createElement('div');
        cardEl.className = 'card';

        cardEl.innerHTML = `
            <div class="card-face card-back"></div>
            <div class="card-face card-front">
                <div class="card-name">${card.name}</div>
                <div class="card-orientation">${card.orientation}</div>
                <div class="card-position">(${card.position})</div>
            </div>
        `;

        cardContainer.appendChild(cardEl);
        cardDisplayArea.appendChild(cardContainer);

        setTimeout(() => {
            if (card.orientation === '逆位') {
                cardEl.classList.add('reversed-draw');
            } else {
                cardEl.classList.add('flipped');
            }
        }, 500 + index * 200);
    });
}

// =================================================================
// 呼叫 AI 的函式 
// =================================================================

/**
 * 構建 Prompt 並呼叫後端 Netlify Function 進行解讀
 * @param {object} spread - 選擇的牌陣資訊
 */
async function getAIInterpretation(spread) {
    interpretationArea.style.display = 'block';
    loader.style.display = 'flex';
    aiInterpretation.innerHTML = '';
    resetBtn.style.display = 'none';

    const prompt = buildPrompt(spread);
    
    try {
        const response = await fetch(`/.netlify/functions/get-interpretation`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: prompt })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || '請求失敗，無法連接到解讀服務。');
        }

        const data = await response.json();
        
        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content.parts[0].text) {
            throw new Error('從 AI 收到的回覆格式無效，請稍後再試。');
        }
        
        const interpretationText = data.candidates[0].content.parts[0].text;
        
        typewriterEffect(interpretationText, aiInterpretation);

        // 將 AI 回覆與當次抽牌結果寫回歷史（若有 currentHistoryId）
        if (currentHistoryId) {
            finalizeHistoryEntry(currentHistoryId, {
                spread: spread.name,
                positions: spread.positions,
                cards: drawnCards,
                aiText: interpretationText
            });
            // 更新歷史顯示（如果歷史視窗開著）
            if (historyContainer.style.display === 'block') showHistory();
            currentHistoryId = null;
        }

    } catch (error) {
        console.error("AI 解讀時發生錯誤:", error);
        aiInterpretation.textContent = `抱歉，解讀時發生錯誤：\n${error.message}`;

        // 若失敗也更新歷史為 done 並記錄錯誤訊息
        if (currentHistoryId) {
            finalizeHistoryEntry(currentHistoryId, {
                spread: spread.name,
                positions: spread.positions,
                cards: drawnCards,
                aiText: `解讀失敗：${error.message}`
            });
            currentHistoryId = null;
        }
    } finally {
        loader.style.display = 'none';
        resetBtn.style.display = 'block';
    }
}

/**
 * 根據使用者問題內容判斷最合適的牌陣（回傳 spreadDetails 的 key）
 * 邏輯：
 * - 含有感情／對方相關關鍵字 -> relationship (關係牌陣)
 * - 明確為是/否／單一選擇疑問 -> single (單牌)
 * - 明確提到過去/現在/未來 -> three-card (三張牌)
 * - 涉及決策、阻礙、方向、工作/財務等較複雜議題 -> cross (十字牌法)
 * - 否則退回長度判斷作為備援
 */
function chooseSpreadAutomatically(question) {
    if (!question || question.trim().length === 0) return 'single';

    const q = question.toLowerCase();

    const relationshipKeywords = ['感情','戀愛','喜歡','對方','分手','曖昧','交往','伴侶','愛情','婚','追','愛','男友','男朋友','女友','女朋友','結婚','約會','關係','在一起'];
    const timeKeywords = ['過去','現在','未來','將來','未來會'];
    const decisionKeywords = ['選擇','決定','應該','要不要','是否','該不該','是不是','如何走','方向','阻礙','障礙','困難','改善'];
    const workMoneyKeywords = ['工作','事業','職場','升遷','面試','收入','薪','錢','投資','財務','財運'];
    const yesNoPatterns = ['是否','要不要','會不會','能不能','能否','有沒有'];

    // 檢查關鍵字出現次數（簡單 heuristic）
    function containsAny(list) {
        return list.some(k => q.indexOf(k) !== -1);
    }

    if (containsAny(relationshipKeywords)) {
        return 'relationship';
    }

    if (containsAny(yesNoPatterns)) {
        // 若同時出現時間字或決策字則視情況選 cross 或 three-card
        if (containsAny(timeKeywords)) return 'three-card';
        return 'single';
    }

    if (containsAny(timeKeywords)) {
        return 'three-card';
    }

    if (containsAny(decisionKeywords) || containsAny(workMoneyKeywords)) {
        return 'cross';
    }

    // 備援：根據字數選擇
    const len = question.trim().length;
    if (len < 10) return 'single';
    if (len < 25) return 'three-card';
    return 'cross';
}

// =================================================================
// 輔助函式 
// =================================================================

function buildPrompt(spread) {
    let cardInfo = drawnCards.map(card => 
        `- 牌位「${card.position}」: **${card.name} (${card.orientation})**\n  - 基本牌義: ${card.orientation === '正位' ? card.upright : card.reversed}`
    ).join('\n');

    return `
        你是一位專業、有同理心且富有智慧的「靈獸牌」占卜師。請依據以下資訊，為使用者提供一次完整且客製化的占卜解讀。

        **你的任務：**
        1.  **綜合分析**：不要只是單純列出牌義。你需要將所有卡牌的意義、牌陣中每個位置的角色，以及使用者的問題結合起來，提供一個融會貫通的、有深度的故事性解讀。
        2.  **客製化回應**：解讀必須緊扣使用者的問題。
        3.  **結構化輸出**：請用清晰的段落來組織你的回答。可以先做一個總結，然後分點解釋每張牌在當前情境下的具體意義，最後給出具體的行動建議或思考方向。
        4.  **語氣**：你的語氣應該是溫暖、鼓勵、且具有啟發性的，即使結果不甚理想，也要以積極正向的方式引導使用者。

        ---

        **占卜資訊如下：**

        **1. 使用者的問題：**
        "${userQuestion}"

        **2. 使用的牌陣：**
        **${spread.name}**
        ${spread.positions.map((p, i) => `   - 位置 ${i+1}: ${p}`).join('\n')}

        **3. 抽出的卡牌：**
        ${cardInfo}

        ---

        **請開始你的解讀：**
    `;
}

function typewriterEffect(text, element) {
    element.innerHTML = "";
    let i = 0;
    function type() {
        if (i < text.length) {
            let char = text.charAt(i);
            if (text.substring(i, i + 2) === '\n') {
                element.innerHTML += '<br>';
                i++;
            } else if (text.substring(i, i + 2) === '**') {
                let end = text.indexOf('**', i + 2);
                if (end !== -1) {
                    element.innerHTML += `<strong>${text.substring(i + 2, end)}</strong>`;
                    i = end + 1;
                } else {
                   element.innerHTML += char;
                }
            }
            else {
                 element.innerHTML += char;
            }
            i++;
            setTimeout(type, 20); // 調整打字速度
        }
    }
    type();
}

// =================================================================
// 詢問紀錄功能（localStorage）
// =================================================================
function createPendingHistoryEntry(question) {
    try {
        const key = 'divinationHistory';
        const raw = localStorage.getItem(key);
        const arr = raw ? JSON.parse(raw) : [];
        const entry = {
            id: Date.now() + Math.floor(Math.random() * 1000),
            question: question,
            time: new Date().toISOString(),
            status: 'pending', // pending / done
            spread: null,
            cards: null,
            aiText: null,
            completedAt: null
        };
        arr.unshift(entry);
        if (arr.length > 100) arr.length = 100;
        localStorage.setItem(key, JSON.stringify(arr));
        return entry.id;
    } catch (e) {
        console.error('建立歷史紀錄失敗', e);
        return null;
    }
}

function finalizeHistoryEntry(id, payload = {}) {
    try {
        const key = 'divinationHistory';
        const raw = localStorage.getItem(key);
        const arr = raw ? JSON.parse(raw) : [];
        const idx = arr.findIndex(a => a.id === id);
        if (idx === -1) return;
        const entry = arr[idx];
        entry.status = 'done';
        if (payload.spread) entry.spread = payload.spread;
        if (payload.positions) entry.positions = payload.positions;
        if (payload.cards) entry.cards = payload.cards;
        if (payload.aiText) entry.aiText = payload.aiText;
        entry.completedAt = new Date().toISOString();
        arr[idx] = entry;
        localStorage.setItem(key, JSON.stringify(arr));
    } catch (e) {
        console.error('更新歷史紀錄失敗', e);
    }
}

//  saveQuestionToHistory 保持相容（仍然可被其他地方呼叫），並回傳 id
function saveQuestionToHistory(question) {
    try {
        const key = 'divinationHistory';
        const raw = localStorage.getItem(key);
        const arr = raw ? JSON.parse(raw) : [];
        const entry = {
            id: Date.now(),
            question: question,
            time: new Date().toISOString()
        };
        arr.unshift(entry); // 最新放前面
        if (arr.length > 100) arr.length = 100;
        localStorage.setItem(key, JSON.stringify(arr));
        return entry.id;
    } catch (e) {
        console.error('儲存詢問紀錄失敗', e);
        return null;
    }
}

// =================================================================
// 顯示歷史：「詳細」按鈕與展開動畫處理
// =================================================================
function showHistory() {
    const key = 'divinationHistory';
    const raw = localStorage.getItem(key);
    const arr = raw ? JSON.parse(raw) : [];
    historyList.innerHTML = '';
    if (arr.length === 0) {
        historyList.innerHTML = '<p>目前沒有詢問紀錄。</p>';
    } else {
        const ul = document.createElement('ul');
        ul.style.listStyle = 'none';
        ul.style.padding = '0';
        ul.style.margin = '0';
        arr.forEach(item => {
            const li = document.createElement('li');
            li.style.padding = '8px';
            li.style.borderBottom = '1px solid rgba(255,255,255,0.04)';

            // 簡短顯示區與按鈕（包含詳細按鈕）
            li.innerHTML = `<div style="display:flex;justify-content:space-between;gap:10px;align-items:center;">
                <div style="flex:1;">
                    <div style="font-weight:600;">${escapeHtml(item.question)}</div>
                    <div style="font-size:0.85em;opacity:0.8;">${new Date(item.time).toLocaleString()} ${item.status === 'pending' ? '（等待中）' : ''}</div>
                </div>
                <div style="display:flex;gap:8px;">
                    <button data-id="${item.id}" class="reuse-question-btn" style="background:#7b68ee;">再次使用</button>
                    <button data-id="${item.id}" class="toggle-detail-btn" style="background:#29b6f6;">詳細</button>
                    <button data-id="${item.id}" class="delete-history-btn" style="background:#d32f2f;">刪除</button>
                </div>
            </div>
            <div class="detail-panel" id="detail-${item.id}" style="margin-top:10px;padding:10px;border-radius:8px;background:rgba(0,0,0,0.12);">
                ${renderDetailContent(item)}
            </div>`;

            ul.appendChild(li);
        });
        historyList.appendChild(ul);

        // 綁定再次使用和刪除
        historyList.querySelectorAll('.reuse-question-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = Number(e.target.dataset.id);
                const entry = arr.find(a => a.id === id);
                if (entry) {
                    userQuestionInput.value = entry.question;
                    userQuestion = entry.question;
                    historyContainer.style.display = 'none';
                    switchScreen(spreadSelectionScreen);
                }
            });
        });
        historyList.querySelectorAll('.delete-history-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = Number(e.target.dataset.id);
                const newArr = arr.filter(a => a.id !== id);
                localStorage.setItem(key, JSON.stringify(newArr));
                showHistory();
            });
        });

        // 綁定詳細按鈕（切換展開 / 收合）
        historyList.querySelectorAll('.toggle-detail-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = Number(e.target.dataset.id);
                const panel = document.getElementById(`detail-${id}`);
                if (!panel) return;
                const open = panel.classList.toggle('open');
                if (open) {
                    // 動態設定 maxHeight 以觸發動畫（smooth expand）
                    panel.style.maxHeight = panel.scrollHeight + 'px';
                } else {
                    panel.style.maxHeight = '0';
                }
            });
        });
    }
    historyContainer.style.display = 'block';
}

function renderDetailContent(item) {
    // 如果還沒完成，顯示等待訊息
    if (!item || item.status === 'pending') {
        return `<div style="padding:10px;color:rgba(255,255,255,0.8);">等待 AI 解讀完成，稍後會顯示詳情。</div>`;
    }
    // 已有詳情：顯示牌陣、牌位、卡牌與 AI 回覆（簡單格式化）
    let html = `<div style="font-weight:700;margin-bottom:8px;">牌陣：${escapeHtml(item.spread || '')}</div>`;
    if (item.cards && Array.isArray(item.cards)) {
        html += `<div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:8px;">`;
        item.cards.forEach(c => {
            html += `<div style="min-width:140px;padding:8px;border-radius:6px;background:rgba(0,0,0,0.06);">
                <div style="font-weight:700;">${escapeHtml(c.name)}</div>
                <div style="font-size:0.9em;color:var(--accent-color);">${escapeHtml(c.orientation)}</div>
                <div style="font-size:0.85em;opacity:0.9;">${escapeHtml(c.position || '')}</div>
                <div style="margin-top:6px;font-size:0.85em;">${escapeHtml(c.orientation === '正位' ? (c.upright || '') : (c.reversed || ''))}</div>
            </div>`;
        });
        html += `</div>`;
    }
    if (item.aiText) {
        // 將 AI 文字放入可展開的 pre 區塊
        html += `<div style="white-space:pre-wrap;text-align:left;padding:10px;border-radius:6px;background:rgba(0,0,0,0.04);max-height:400px;overflow:auto;">${escapeHtml(item.aiText)}</div>`;
    }
    return html;
}

// =================================================================
// 每日運勢功能（每天重置，使用 localStorage 快取）
// =================================================================
function showDailyHoroscope() {
    const todayKey = getTodayKey();
    const storageKey = `dailyHoroscope_${todayKey}`;
    let data = null;
    try {
        const raw = localStorage.getItem(storageKey);
        if (raw) {
            data = JSON.parse(raw);
        } else {
            data = generateDailyHoroscope(todayKey);
            localStorage.setItem(storageKey, JSON.stringify(data));
        }
    } catch (e) {
        console.error('讀取/產生每日運勢錯誤', e);
        data = generateDailyHoroscope(todayKey);
    }
    renderDailyHoroscope(data);
    dailyHoroscopeContainer.style.display = 'block';
}

function getTodayKey() {
    const d = new Date();
    // 使用 YYYY-MM-DD 作為 key，確保每天不同
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}

// 產生 deterministic 的每日運勢（同一天結果相同）
function generateDailyHoroscope(seedStr) {
    // categories 可以擴增
    const categories = ['愛情', '財運', '事業/學業', '健康', '人際'];
    // 建立 seeded random
    const rnd = mulberry32(hashCode(seedStr + '_靈獸牌'));
    const scores = {};
    let total = 0;
    categories.forEach(cat => {
        // 分數 30 ~ 95
        const s = Math.floor(30 + Math.floor(rnd() * 66));
        scores[cat] = s;
        total += s;
    });
    const overall = Math.round(total / categories.length);
    // 產生每個分類的簡短建議
    const details = categories.map(cat => {
        return {
            category: cat,
            score: scores[cat],
            short: scoreToAdvice(scores[cat], cat)
        };
    });

    return {
        date: seedStr,
        overall,
        details,
        generatedAt: new Date().toISOString()
    };
}

// 簡單 hash 與 seeded PRNG（輕量）
function hashCode(str) {
    let h = 2166136261 >>> 0;
    for (let i = 0; i < str.length; i++) {
        h ^= str.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    return h >>> 0;
}
function mulberry32(a) {
    return function() {
        let t = a += 0x6D2B79F5;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }
}

function scoreToAdvice(score, category) {
    if (score >= 85) return `非常好，${category}方面有明顯的正向能量，建議把握時機並主動出擊。`;
    if (score >= 70) return `不錯，${category}方面較為順利，維持現在的步調，適度努力可見成效。`;
    if (score >= 50) return `普通，${category}方面有起伏，注意細節並避免冒進。`;
    if (score >= 35) return `偏弱，${category}方面可能遇到阻礙，建議保持耐心並尋求支援。`;
    return `較差，${category}方面需要多留心與調整，建議先專注基礎且避免風險行為。`;
}

function renderDailyHoroscope(data) {
    let html = `<div style="font-weight:700;font-size:1.1em;margin-bottom:8px;">日期：${data.date}　整體運勢：${data.overall}/100</div>`;
    html += `<div style="display:flex;flex-direction:column;gap:8px;">`;
    data.details.forEach(d => {
        html += `<div style="display:flex;justify-content:space-between;align-items:center;padding:8px;border-radius:6px;background:rgba(0,0,0,0.08);">
            <div style="font-weight:600;">${d.category}</div>
            <div style="text-align:right;">
                <div style="font-weight:700;color:${scoreColor(d.score)}">${d.score}/100</div>
                <div style="font-size:0.9em;opacity:0.9;margin-top:4px;">${d.short}</div>
            </div>
        </div>`;
    });
    html += `</div>`;
    dailyHoroscopeContent.innerHTML = html;
}

function scoreColor(score) {
    if (score >= 85) return '#4caf50';
    if (score >= 70) return '#8bc34a';
    if (score >= 50) return '#ffb300';
    if (score >= 35) return '#ff7043';
    return '#d32f2f';
}

// 防 XSS 簡單處理
function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function (s) {
        return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[s];
    });
}