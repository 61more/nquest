document.addEventListener('DOMContentLoaded', () => {
  const pages = document.querySelectorAll('.page');
  const menuItems = document.querySelectorAll('.menu-item');

  const resetStorageButton = document.getElementById('reset-storage');

  // Initialize stats
  let actionPoints = parseInt(localStorage.getItem('actionPoints')) || 0;
  let languageSkills = parseInt(localStorage.getItem('languageSkills')) || 0;
  let planningSkills = parseInt(localStorage.getItem('planningSkills')) || 0;
  let level = parseInt(localStorage.getItem('level')) || 0;
  let normalTickets = parseInt(localStorage.getItem('normalTickets')) || 0;
  let premiumTickets = parseInt(localStorage.getItem('premiumTickets')) || 0;
  let collectedItems = JSON.parse(localStorage.getItem('collectedItems')) || { normal: [], premium: [] };

  
  updateTicketsDisplay();

   // Item data
   const items = [
    { rarity: 3, number: 1, name: 'アイテム1', image: 'img/item1.png', type: 'type1', description: 'これはアイテム1の説明です。' },
    { rarity: 3, number: 2, name: 'アイテム2', image: 'img/item2.png', type: 'type2', description: 'これはアイテム2の説明です。' },
    { rarity: 3, number: 3, name: 'アイテム3', image: 'img/item3.png', type: 'type1', description: 'これはアイテム3の説明です。' },
    { rarity: 4, number: 4, name: 'アイテム4', image: 'img/item4.png', type: 'type2', description: 'これはアイテム4の説明です。' },
    { rarity: 4, number: 5, name: 'アイテム5', image: 'img/item5.png', type: 'type1', description: 'これはアイテム5の説明です。' },
    { rarity: 4, number: 6, name: 'アイテム6', image: 'img/item6.png', type: 'type2', description: 'これはアイテム6の説明です。' },
    { rarity: 5, number: 7, name: 'アイテム7', image: 'img/item7.png', type: 'type1', description: 'これはアイテム7の説明です。' },
    { rarity: 5, number: 8, name: 'アイテム8', image: 'img/item8.png', type: 'type2', description: 'これはアイテム8の説明です。' },
    { rarity: 5, number: 9, name: 'アイテム9', image: 'img/item9.png', type: 'type1', description: 'これはアイテム9の説明です。' },
    { rarity: 5, number: 10, name: 'アイテム10', image: 'img/item10.png', type: 'type2', description: 'これはアイテム10の説明です。' },
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
          <p>レア度: ☆${item.rarity}</p>
          <p>タイプ: ${item.type}</p>
          <p>${item.description}</p>
      </div>
  `;
  itemList.appendChild(listItem);
  });
   

}

  
  // Function to calculate and update level
  function updateLevel() {
    const average = (actionPoints + languageSkills + planningSkills) / 3;
    const newLevel = Math.floor(average);
    
    if (newLevel > level) {
        // Increment level
        level = newLevel;
        document.getElementById('level').textContent = level;

        // Give tickets based on level
        if (level % 5 === 0) {
            // Give premium ticket
            premiumTickets++;
        } else {
            // Give normal ticket
            normalTickets++;
        }

        updateTicketsDisplay();
        localStorage.setItem('level',level);
    }
}

  // Display stats
  document.getElementById('action-points').textContent = actionPoints;
  document.getElementById('language-skills').textContent = languageSkills;
  document.getElementById('planning-skills').textContent = planningSkills;
  document.getElementById('level').textContent = level;
  updateLevel();
  
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

  document.getElementById('normal-gacha-button').addEventListener('click', function() {
    if (normalTickets > 0) {
        spinGacha('normal');
        normalTickets--;
        updateTicketsDisplay();
    } else {
        alert('ノーマルチケットが足りません！');
    }
});

// Premium gacha button click event
document.getElementById('premium-gacha-button').addEventListener('click', function() {
    if (premiumTickets > 0) {
        spinGacha('premium');
        premiumTickets--;
        updateTicketsDisplay();
    } else {
        alert('高級チケットが足りません！');
    }
});



// Function to spin gacha and get random item
function spinGacha(type) {
  let item;
  if (type === 'normal') {
      item = getRandomItem([3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5]);
  } else if (type === 'premium') {
      item = getRandomItem([4, 4, 4, 4, 4, 5]);
  }

  // Display result
  const resultElement = document.getElementById('gacha-result');
  resultElement.textContent = `おめでとうございます！ ${item.name} (☆${item.rarity}) のアイテムを手に入れました！`;

  // Add item to collected items
  collectedItems[type].push(item);
  localStorage.setItem('collectedItems', JSON.stringify(collectedItems));

  // Update item list display
  updateItemList();
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
    localStorage.removeItem('normalTickets');
    localStorage.removeItem('premiumTickets');
    localStorage.removeItem('collectedItems');
    normalTickets = 0;
    premiumTickets = 0;
    collectedItems = { normal: [], premium: [] };
    updateTicketsDisplay();
    updateItemList(); // Update item list to clear displayed items
    alert('ローカルストレージのデータがリセットされました。');
});

  document.getElementById('start-button').addEventListener('click', function() {
      const gameContainer = document.getElementById('game-container');
      gameContainer.innerHTML = '<p>ゲームが開始されました！</p>';

      // ここにゲームのロジックを追加します
      // サンプルとしてステータスを増加させる
      actionPoints += 1;
      languageSkills += 1;
      planningSkills += 1;

      // 更新された値を表示
      document.getElementById('action-points').textContent = actionPoints;
      document.getElementById('language-skills').textContent = languageSkills;
      document.getElementById('planning-skills').textContent = planningSkills;

      // レベルを更新
      updateLevel();

      // ローカルストレージに保存
      localStorage.setItem('actionPoints', actionPoints);
      localStorage.setItem('languageSkills', languageSkills);
      localStorage.setItem('planningSkills', planningSkills);
  });


const CLIENT_ID = '566945190703-2icg1k1svgqdg3rh9f63i3jc1306ih2m.apps.googleusercontent.com';  // OAuth 2.0 クライアントIDを設定
const API_KEY = 'AIzaSyCZnpg9TDD-a8OnIS8SjL476Rd8gZre1m4';      // APIキーを設定
const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
const SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";
  


const authorizeButton = document.getElementById('authorize-button');
const signoutButton = document.getElementById('signout-button');
const content = document.getElementById('content');

function handleClientLoad() {
  console.log(1);
    gapi.load('client:auth2', initClient);
  console.log(2);
}

function initClient() {
  console.log('Client initialized');
    gapi.client.init({
    
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(() => {
      console.log('Client initialized');
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    }, (error) => {
        console.error(JSON.stringify(error, null, 2));
    });
}

function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
        getSpreadsheetData();
    } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
    }
}

function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
    
}

function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}

function getSpreadsheetData() {
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: '1QMjhvVYjDOco7jhZ9hnRx8KyrvOEq5QdC3bB-GSTsU0', // スプレッドシートIDを設定
        range: 'シート1!C4:D15', // 取得する範囲を設定
    }).then((response) => {
        const range = response.result;
        if (range.values.length > 0) {
            let output = '';
            for (let i = 0; i < range.values.length; i++) {
                const row = range.values[i];
                output += row.join(', ') + '\n';
            }
            content.textContent = output;
        } else {
            content.textContent = 'No data found.';
        }
    }, (response) => {
        content.textContent = 'Error: ' + response.result.error.message;
    });
}


 document.addEventListener('DOMContentLoaded', handleClientLoad);

  
});
