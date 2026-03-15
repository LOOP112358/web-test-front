// script.js (前端代码)
const analyzeBtn = document.getElementById('analyzeBtn');
const animeInput = document.getElementById('anime');
const charInput = document.getElementById('character');
const reportDiv = document.getElementById('report');
const resultText = document.getElementById('resultText');

analyzeBtn.addEventListener('click', async () => { // 增加 async 以支持异步请求
    const anime = animeInput.value;
    const char = charInput.value;

    if (anime === "" || char === "") {
        alert("请填写完整内容哦！");
        return;
    }

    // 1. 显示加载中状态
    resultText.innerText = "正在向后端请求分析，请稍候...";
    reportDiv.classList.remove('hidden');

    try {
        // 2. 向后端发送请求 (假设你的后端地址是 http://localhost:3000/analyze)
        const response = await fetch('https://web-test-uwrc.onrender.com/analyze', {
            method: 'POST', // 使用 POST 传递数据
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ anime, character: char }) // 将数据转为 JSON 字符串
        });

        // 3. 处理返回结果
        const data = await response.json(); 
        resultText.innerText = data.analysis; // 将后端返回的分析内容显示在页面上

    } catch (error) {
        resultText.innerText = "出错了，后端可能还没启动哦！";
        console.error("Error:", error);
    }
});
