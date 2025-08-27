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

// =================================================================
// 卡牌數據 (這部分不變)
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
// 應用程式狀態 (這部分不變)
// =================================================================
let userQuestion = '';
let drawnCards = [];

// =================================================================
// 事件監聽 (這部分不變)
// =================================================================
submitQuestionBtn.addEventListener('click', () => {
    userQuestion = userQuestionInput.value.trim();
    if (userQuestion === '') {
        alert('請先輸入您的問題！');
        return;
    }
    switchScreen(spreadSelectionScreen);
});

spreadOptions.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const spreadType = e.target.dataset.spread;
        handleSpreadSelection(spreadType);
    }
});

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

// =================================================================
// 核心功能函式 (除了 getAIInterpretation，其他不變)
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
        if (userQuestion.length < 10) {
           selectedSpread = spreadDetails['single'];
        } else if (userQuestion.length < 25) {
           selectedSpread = spreadDetails['three-card'];
        } else {
           selectedSpread = spreadDetails['cross'];
        }
        cardCount = selectedSpread.count;
    } else {
        cardCount = selectedSpread.count;
    }

    switchScreen(divinationScreen);
    questionDisplay.textContent = `問題：「${userQuestion}」`;
    
    drawAndDisplayCards(selectedSpread);
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
// 呼叫 AI 的函式 (已修改)
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

    // 準備 Prompt 的部分不變
    const prompt = buildPrompt(spread);
    
    try {
        // API 呼叫已修改，指向我們自己的 Netlify Function
        const response = await fetch(`/.netlify/functions/get-interpretation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // 現在只需要傳送 prompt
            body: JSON.stringify({ prompt: prompt })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || '請求失敗，無法連接到解讀服務。');
        }

        const data = await response.json();
        
        // 增加一個健壯性檢查，確保收到的回覆格式正確
        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content.parts[0].text) {
            throw new Error('從 AI 收到的回覆格式無效，請稍後再試。');
        }
        
        const interpretationText = data.candidates[0].content.parts[0].text;
        
        typewriterEffect(interpretationText, aiInterpretation);

    } catch (error) {
        console.error("AI 解讀時發生錯誤:", error);
        aiInterpretation.textContent = `抱歉，解讀時發生錯誤：\n${error.message}`;
    } finally {
        loader.style.display = 'none';
        resetBtn.style.display = 'block';
    }
}

// =================================================================
// 輔助函式 (這部分不變)
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