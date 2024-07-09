document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.page');
    const menuItems = document.querySelectorAll('.menu-item');



    const resetStorageButton = document.getElementById('reset-storage');

    // Initialize stats
    let actionPoints = parseInt(localStorage.getItem('actionPoints')) || 0;
    let verbalizing = parseInt(localStorage.getItem('verbalizing')) || 0;
    let planningSkills = parseInt(localStorage.getItem('planningSkills')) || 0;
    let level = parseInt(localStorage.getItem('level')) || 0;
    let normalTickets = parseInt(localStorage.getItem('normalTickets')) || 0;
    let premiumTickets = parseInt(localStorage.getItem('premiumTickets')) || 0;
    let collectedItems = JSON.parse(localStorage.getItem('collectedItems')) || { normal: [], premium: [] };


    updateTicketsDisplay();

    // Item data
    const items = [
        { rarity: 3, number: 1, name: '濡れて細くなった犬', image: './img/濡れて細くなった犬.png', type: 'ペット', description: 'これはアイテム1の説明です。' },
        { rarity: 3, number: 2, name: '濡れて細くなった猫', image: './img/濡れて細くなった猫.png', type: 'ペット', description: 'これはアイテム2の説明です。' },
        { rarity: 3, number: 3, name: '新千円札', image: './img/新千円札.png', type: 'アイテム', description: 'これはアイテム3の説明です。' },
        { rarity: 3, number: 4, name: 'ゾウ', image: './img/ゾウ.png', type: 'ペット', description: 'これはアイテム4の説明です。' },
        { rarity: 4, number: 5, name: 'ダルマハダカカメガイ', image: './img/ダルマハダカカメガイ.png', type: 'ペット', description: 'これはアイテム5の説明です。' },
        { rarity: 4, number: 6, name: 'トルネードポテト', image: './img/トルネードポテト.png', type: 'アイテム', description: 'これはアイテム6の説明です。' },
        { rarity: 5, number: 7, name: 'てんしちゃんの輪っか', image: './img/てんしちゃんの輪っか.png', type: 'アイテム', description: 'これはアイテム7の説明です。' },
        { rarity: 5, number: 8, name: '特級呪物　ポリチュウ', image: './img/ポリチュウ.png', type: 'ペット', description: 'これはアイテム8の説明です。' },
        { rarity: 5, number: 9, name: '草むらから飛び出すねこ', image: './img/草むらから飛び出すねこ.png', type: 'ペット', description: 'これはアイテム9の説明です。' },
        { rarity: 5, number: 10, name: '松島さんポスター', image: './img/松島さんポスター.png', type: 'アイテム', description: 'これはアイテム10の説明です。' },
        { rarity: 4, number: 11, name: 'オコジョ', image: './img/オコジョ.png', type: 'ペット', description: 'これはアイテム1の説明です。' },
        { rarity: 4, number: 12, name: '赤五索', image: './img/赤五索.png', type: 'アイテム', description: 'これはアイテム1の説明です。' },
        { rarity: 3, number: 13, name: 'ギタースタンド', image: './img/ギタースタンド.png', type: 'アイテム', description: 'これはアイテム1の説明です。' },
        { rarity: 3, number: 14, name: '突っ張り棒', image: './img/突っ張り棒.png', type: 'アイテム', description: 'これはアイテム1の説明です。' },
        { rarity: 3, number: 15, name: '部分入れ歯', image: './img/部分入れ歯.png', type: 'アイテム', description: 'これはアイテム1の説明です。' },
        { rarity: 3, number: 16, name: 'ゴマ団子', image: './img/ゴマ団子.png', type: 'アイテム', description: 'これはアイテム1の説明です。' },
        { rarity: 3, number: 17, name: '岩塩', image: './img/岩塩.png', type: 'アイテム', description: 'これはアイテム1の説明です。' },
        { rarity: 5, number: 18, name: 'ポリチュウTシャツ', image: './img/ポリチュウTシャツ.png', type: 'アイテム', description: 'これはアイテム1の説明です。' }
       
        
       
    ];



    // Function to update displayed ticket counts
    function updateTicketsDisplay() {
        document.getElementById('normal-tickets').textContent = normalTickets;
        document.getElementById('premium-tickets').textContent = premiumTickets;

        // Also update gacha ticket counts
        document.getElementById('normal-tickets-gacha').textContent = normalTickets;
        document.getElementById('premium-tickets-gacha').textContent = premiumTickets;

        // Save to localStorage
        localStorage.setItem('normalTickets', normalTickets);
        localStorage.setItem('premiumTickets', premiumTickets);
    }

    function updateItemList(sortType = 'acquired-asc') {
        const itemList = document.getElementById('item-list');
        itemList.innerHTML = ''; // Clear current list
        let allItems = [];
        if (collectedItems.normal.length === 0 && collectedItems.premium.length === 0) {
            allItems = items.map((item, index) => ({ ...item, acquiredIndex: index }));
        } else {
            allItems = [...collectedItems.normal, ...collectedItems.premium];
        }

        if (sortType === 'number-asc') {
            allItems.sort((a, b) => a.number - b.number);
        } else if (sortType === 'number-desc') {
            allItems.sort((a, b) => b.number - a.number);
        } else if (sortType === 'acquired-asc') {
            allItems.sort((a, b) => a.acquiredIndex - b.acquiredIndex);
        } else if (sortType === 'acquired-desc') {
            allItems.sort((a, b) => b.acquiredIndex - a.acquiredIndex);
        }

        allItems.forEach(item => {
            const listItem = document.createElement('li');
            listItem.className = 'item';
            listItem.innerHTML = `
    <img src="${item.image}" alt="${item.name}">
    <div>
        <h3>${item.name}</h3>
        <p>☆${item.rarity}</p>
        <p>タイプ: ${item.type}</p>
        <p>${item.description}</p>
    </div>
    `;
            itemList.appendChild(listItem);
        });


    }

    function displayStats() {
        document.getElementById('action-points').textContent = actionPoints;
        document.getElementById('language-skills').textContent = verbalizing;
        document.getElementById('planning-skills').textContent = planningSkills;

    }
    displayStats();
    updateLevel();
    // Function to calculate and update level
    function updateLevel() {
        const average = (actionPoints + verbalizing + planningSkills) / 3;
        const newLevel = Math.floor(average);
        const oldLevel = localStorage.getItem('level');
        for(let i =oldLevel;i<=newLevel;i++){
            level ++;
            // Give tickets based on level
            if (level % 5 === 0) {
                // Give premium ticket
                premiumTickets++;
            } else {
                // Give normal ticket
                normalTickets++;
            }
        }
        document.getElementById('level').textContent = level;
        updateTicketsDisplay();
        localStorage.setItem('level', level);
    }

    menuItems.forEach(item => {
        item.addEventListener('click', event => {
            event.preventDefault();
            const pageId = item.getAttribute('data-page');

            // Remove active class from all pages and menu items
            pages.forEach(page => page.classList.remove('active'));
            menuItems.forEach(menu => menu.classList.remove('active'));

            // Add active class to the clicked menu item and corresponding page
            document.getElementById(pageId).classList.add('active');
            item.classList.add('active');
        });
    });

    document.getElementById('normal-gacha-button').addEventListener('click', function () {
        if (normalTickets > 0) {
            spinGacha('normal');
            normalTickets--;
            updateTicketsDisplay();
        } else {
            alert('ノーマルチケットが足りません！');
        }
    });

    // Premium gacha button click event
    document.getElementById('premium-gacha-button').addEventListener('click', function () {
        if (premiumTickets > 0) {
            spinGacha('premium');
            premiumTickets--;
            updateTicketsDisplay();
        } else {
            alert('高級チケットが足りません！');
        }
    });
    //10連
    document.getElementById('normal-gacha-ten-button').addEventListener('click', function () {
        if (normalTickets >= 10) {
            spinGachaTen('normal');
            normalTickets -= 10;
            updateTicketsDisplay();
        } else {
            alert('ノーマルチケットが足りません！');
        }
    });
    document.getElementById('premium-gacha-ten-button').addEventListener('click', function () {
        if (premiumTickets >= 10) {
            spinGachaTen('premium');
            premiumTickets -= 10;
            updateTicketsDisplay();
        } else {
            alert('高級チケットが足りません！');
        }
    });


    // Function to spin gacha and get random item
    function spinGacha(type) {
        const modalResult = document.getElementById('modal-result');
        modalResult.innerHTML　="";
        // モーダルウィンドウを表示
        const modal = document.getElementById('myModal');
        modal.style.display = 'block';
        const gachaAnimation = document.getElementById('gachaAnimation');
        gachaAnimation.style.display = 'block';

        // 3秒後にガチャ結果を表示する
        setTimeout(() => {
            
            gachaAnimation.style.display = 'none';
            const item = drawGacha(type); // ガチャを引いて結果を取得

            // 結果をモーダルに表示
            
            modalResult.innerHTML = `<img src ="${item.image}" id = "item-image"><p>おめでとうございます！ ${item.name} (☆${item.rarity}) を手に入れました！</p>`;

            // Add item to collected items
            collectedItems[type].push(item);
            localStorage.setItem('collectedItems', JSON.stringify(collectedItems));

            // Update item list display
            updateItemList();


        }, 3000); // 3000ミリ秒 = 3秒
    }
    function spinGachaTen(type) {
        const modalResult = document.getElementById('modal-result');
        modalResult.innerHTML　="";
        // モーダルウィンドウを表示
        const modal = document.getElementById('myModal');
        modal.style.display = 'block';
        const gachaAnimation = document.getElementById('gachaAnimation');
        gachaAnimation.style.display = 'block';

        // 3秒後にガチャ結果を表示する
        setTimeout(() => {
            
            gachaAnimation.style.display = 'none';
            const obtainedItems = [];
            for(let i=0;i<10;i++){
                obtainedItems.push(drawGacha(type));
            }
            
            
            // 結果をモーダルに表示
            
            modalResult.innerHTML = `
    <div class="gacha-result-container">
        ${obtainedItems.map(item => `
            <div class="gacha-result-items">
                <img src="${item.image}" id="item-image">
                <p>${item.name} (☆${item.rarity})</p>
            </div>
        `).join('')}
    </div>
`;

            // Add item to collected items
            for(i = 0;i<10;i++){
                collectedItems[type].push(obtainedItems[i]);
            }
            
            localStorage.setItem('collectedItems', JSON.stringify(collectedItems));

            // Update item list display
            updateItemList();


        }, 3000); // 3000ミリ秒 = 3秒
    }





    // モーダルウィンドウの閉じるボタン
    const closeModal = document.getElementsByClassName("close")[0];
    closeModal.onclick = function () {
        const modal = document.getElementById('myModal');
        modal.style.display = 'none';

    }

    // ガチャを引く関数 (実際のガチャ処理をここに移動)
    function drawGacha(type) {
        let item;
        if (type === 'normal') {
            item = getRandomItem([3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5]);
        } else if (type === 'premium') {
            item = getRandomItem([4, 4, 4, 4, 5, 5]);
        }
        return item;
    }
    // Function to get random rarity based on probabilities
    // Function to get random item based on rarity
    function getRandomItem(rarities) {
        const probabilities = {
            3: 70,
            4: 25,
            5: 5
        };

        let totalWeight = 0;
        for (let rarity of rarities) {
            totalWeight += probabilities[rarity];
        }

        let randomNumber = Math.random() * totalWeight;
        for (let i = 0; i < rarities.length; i++) {
            const rarity = rarities[i];
            if (randomNumber < probabilities[rarity]) {
                const filteredItems = items.filter(item => item.rarity === rarity);
                return filteredItems[Math.floor(Math.random() * filteredItems.length)];
            }
            randomNumber -= probabilities[rarity];
        }

        // Fallback (should not reach here)
        return items[items.length - 1];
    }


    // Sort button event listeners
    document.querySelectorAll('.sort-buttons button').forEach(button => {
        button.addEventListener('click', () => {
            const sortType = button.getAttribute('data-sort');
            updateItemList(sortType);
        });
    });


    // Reset local storage button event
    resetStorageButton.addEventListener('click', () => {
        localStorage.removeItem('actionPoints');
        localStorage.removeItem('verbalizing');
        localStorage.removeItem('planingSkills');
        localStorage.removeItem('level');
        localStorage.removeItem('normalTickets');
        localStorage.removeItem('premiumTickets');
        localStorage.removeItem('collectedItems');
        localStorage.removeItem('username');
        localStorage.removeItem('lastUpdateDateAction');
        localStorage.removeItem('lastUpdateDatePlanning');
        localStorage.removeItem('lastUpdateValueVerbalizing');
        localStorage.removeItem('lastUpdateDateVerbalizing');
        localStorage.removeItem('lastUpdateValueVerbalizing');

        actionPoints = 0;
        verbalizing = 0;
        planningSkills = 0;
        level = 0;
        normalTickets = 0;
        premiumTickets = 0;
        collectedItems = { normal: [], premium: [] };
        displayStats();
        updateLevel();
        updateTicketsDisplay();
        updateItemList(); // Update item list to clear displayed items
        usernameInput.style.display = 'block';
        saveUsernameButton.style.display = 'block';
        welcomeMessage.textContent = '';
        usernameInput.textContent = '';
        alert('ローカルストレージのデータがリセットされました。');
    });

    document.getElementById('start-button').addEventListener('click', function () {
        const gameContainer = document.getElementById('game-container');
        gameContainer.innerHTML = '<p>経験値が5ずつ上昇しました(テスト)</p>';

        // ここにゲームのロジックを追加します
        // サンプルとしてステータスを増加させる
        actionPoints += 5;
        verbalizing += 5;
        planningSkills += 5;

        // 更新された値を表示


        // レベルを更新
        updateLevel();

        // ローカルストレージに保存
        localStorage.setItem('actionPoints', actionPoints);
        localStorage.setItem('verbalizing', verbalizing);
        localStorage.setItem('planningSkills', planningSkills);
    });


    const CLIENT_ID = '566945190703-2icg1k1svgqdg3rh9f63i3jc1306ih2m.apps.googleusercontent.com';
    // APIキーを非同期で取得
    async function fetchApiKey() {
        try {
            const response = await fetch('/api-key');
            const data = await response.json();
            return data.apiKey;
        } catch (error) {
            console.error('Error fetching API Key:', error);
        }
    }

    // APIキーを変数に格納
    let API_KEY = '';
    fetchApiKey().then(apiKey => {
        API_KEY = apiKey;
    });





    const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
    const SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

    const usernameInput = document.getElementById('username-input');
    const saveUsernameButton = document.getElementById('save-username-button');
    const welcomeMessage = document.getElementById('welcome-message');

    function saveUsername() {
        const username = usernameInput.value;
        if (username) {
            localStorage.setItem('username', username);
            displayUsername();
        }
    }
    saveUsernameButton.addEventListener('click', saveUsername);

    function displayUsername() {
        const username = localStorage.getItem('username');
        if (username) {
            welcomeMessage.textContent = `Welcome, ${username}!`;
            usernameInput.style.display = 'none';
            saveUsernameButton.style.display = 'none';
        } else {
            welcomeMessage.textContent = '';
        }
    }
    displayUsername();

    const authorizeButton = document.getElementById('authorize-button');
    const signoutButton = document.getElementById('signout-button');
    const content = document.getElementById('content');



    let tokenClient;
    let gapiInited = false;
    let gisInited = false;

    function gapiLoaded() {
        gapi.load('client', initializeGapiClient);
    }

    async function initializeGapiClient() {
        await gapi.client.init({
            apiKey: API_KEY,
            discoveryDocs: DISCOVERY_DOCS,
        });
        gapiInited = true;
        maybeEnableButtons();
    }

    function gisLoaded() {
        tokenClient = google.accounts.oauth2.initTokenClient({
            client_id: CLIENT_ID,
            scope: SCOPES,
            callback: '', // defined later
        });
        gisInited = true;
        maybeEnableButtons();
    }

    function maybeEnableButtons() {
        if (gapiInited && gisInited) {
            authorizeButton.style.display = 'block';
            authorizeButton.onclick = handleAuthClick;
            signoutButton.onclick = handleSignoutClick;
        }
    }

    function handleAuthClick() {
        tokenClient.callback = async (resp) => {
            if (resp.error !== undefined) {
                throw (resp);
            }
            authorizeButton.style.display = 'none';
            signoutButton.style.display = 'block';
            loadDataButton.style.display = 'block';
            //await increaseExperience();
            //await listMajors();
        };

        if (gapi.client.getToken() === null) {
            // Prompt the user to select a Google Account and ask for consent to share their data
            // when establishing a new session.
            tokenClient.requestAccessToken({ prompt: 'consent' });
        } else {
            // Skip display of account chooser and consent dialog for an existing session.
            tokenClient.requestAccessToken({ prompt: '' });
        }
    }

    function handleSignoutClick() {
        const token = gapi.client.getToken();
        if (token !== null) {
            google.accounts.oauth2.revoke(token.access_token);
            gapi.client.setToken('');
            authorizeButton.style.display = 'block';
            signoutButton.style.display = 'none';
            content.textContent = '';
        }
    }

    let valueAttendance = 0;
    let valueSubmission1 = 0;
    let valueSubmission2 = 0;
    let rateJournal = 0;


    async function checkCell(username) {
        let sheetName;
        if (username === 'アーニャ') {
            sheetName = 'アーニャ';
        } else if (username === 'ベッキー') {
            sheetName = 'ベッキー';
        } else if (username === 'ユーザー3') {
            sheetName = 'ユーザー3';
        } else {
            return false;
        }

        try {
            const response = await gapi.client.sheets.spreadsheets.values.get({
                spreadsheetId: '1QMjhvVYjDOco7jhZ9hnRx8KyrvOEq5QdC3bB-GSTsU0',
                range: `${sheetName}!C4:D15`,
            });
            valueAttendance = response.result.values[0][0];
            valueSubmission1 = response.result.values[1][0];
            valueSubmission2 = response.result.values[1][1];

            let cellCountJournal = 0;
            for (let i = 0; i < response.result.values.length - 2; i++) {
                for (let j = 0; j < response.result.values[i + 2].length; j++) {
                    if (response.result.values[i + 2][j] !== "") {
                        cellCountJournal++;
                    }
                }
            }
            rateJournal = cellCountJournal / 20;

            return true;

        } catch (err) {
            console.error(err);
            return false;
        }
    }



    function getToday() {
        const today = new Date();
        return today.toISOString().split('T')[0]; // yyyy-mm-dd
    }

    async function increaseExperience() {
        const username = localStorage.getItem('username');
        const today = getToday();



        const cellFilled = await checkCell(username);
        if (cellFilled) {
            const lastUpdateDateAction = localStorage.getItem('lastUpdateDateAction');
            let commentActionPoint;

            if (lastUpdateDateAction === today) {
                commentActionPoint = '行動力経験値獲得済み: 10';
            } else if (valueAttendance !== "") {
                actionPoints += 10;
                document.getElementById('action-points').textContent = actionPoints;
                localStorage.setItem('actionPoints', actionPoints);
                localStorage.setItem('lastUpdateDateAction', today);

                commentActionPoint = (`出席:〇 行動力経験値 10`);
            }

            const lastUpdateDatePlanning = localStorage.getItem('lastUpdateDatePlanning');
            let lastUpdateValuePlanning = localStorage.getItem('lastUpdateValuePlanning');
            let updateValuePlanning = 0;
            let commentSubmission;
            if (valueSubmission1 !== "") {
                updateValuePlanning += 5;

            }
            if (valueSubmission2 !== "") {
                updateValuePlanning += 5;
            }

            if (lastUpdateDatePlanning === today) {
                commentSubmission = '計画力経験値反映済み:' + lastUpdateValuePlanning;
            } else {
                planningSkills += updateValuePlanning;
                document.getElementById('planning-skills').textContent = planningSkills;
                localStorage.setItem('planningSkills', planningSkills);
                localStorage.setItem('lastUpdateDatePlanning', today);
                localStorage.setItem('lastUpdateValuePlanning', updateValuePlanning);

                commentSubmission = (`フォーム提出あり 計画力経験値: ` + updateValuePlanning);
            }

            const lastUpdateDateVerbalizing = localStorage.getItem('lastUpdateDateVerbalizing');
            let lastUpdateValueVerbalizing = localStorage.getItem('lastUpdateValueVerbalizing');
            let updateValueVebalizing = Math.floor(rateJournal * 10);
            let commentJournal;

            if (lastUpdateDateVerbalizing === today) {
                commentJournal = '言語化力経験値反映済み:' + lastUpdateValueVerbalizing;
            } else {
                verbalizing += updateValueVebalizing;
                document.getElementById('language-skills').textContent = verbalizing;
                localStorage.setItem('verbalizing', verbalizing);
                localStorage.setItem('lastUpdateDateVerbalizing', today);
                localStorage.setItem('lastUpdateValueVerbalizing', updateValueVebalizing);

                commentJournal = (`日誌記入あり 言語化力経験値: ` + updateValueVebalizing);
            }
            displayStats();
            updateLevel();
            alert(commentActionPoint + '\n' + commentSubmission + '\n' + commentJournal);

        } else {
            alert('指定されたセルに入力がありません。');
            handleSignoutClick();
        }
    }

    loadDataButton.addEventListener('click', increaseExperience);




    async function listMajors() {
        let response;
        try {
            response = await gapi.client.sheets.spreadsheets.values.get({
                spreadsheetId: '1QMjhvVYjDOco7jhZ9hnRx8KyrvOEq5QdC3bB-GSTsU0',
                range: 'シート1!C4:D15',
            });
        } catch (err) {
            console.error(err);
            return;
        }
        const range = response.result;
        if (!range || !range.values || range.values.length == 0) {
            content.textContent = 'No data found.';
            return;
        }
        content.textContent = range.values.map(row => row.join(', ')).join('\n');
    }


    gapiLoaded();
    gisLoaded();







});
