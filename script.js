// script.js (前端代码)
const analyzeBtn = document.getElementById('analyzeBtn');
const animeInput = document.getElementById('anime');
const charInput = document.getElementById('character');
const reportDiv = document.getElementById('report');
const resultText = document.getElementById('resultText');

analyzeBtn.addEventListener('click', async () => { // 增加 async 以支持异步请求
    const anime = animeInput.value.trim();
    const char = charInput.value.trim();

    if (anime === "" || char === "") {
        alert("请填写完整内容哦！");
        return;
    }

    // 1. 显示加载中状态
    resultText.innerText = "正在向后端请求分析，请稍候...(Render 免费版如果休眠了，可能需要等待十几秒)";
    reportDiv.classList.remove('hidden');

    try {
        // 2. 向后端发送请求 (假设你的后端地址是 http://localhost:3000/analyze)
        const response = await fetch('https://web-test-uwrc.onrender.com/analyze', {
            method: 'POST', // 使用 POST 传递数据
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
             },
            body: JSON.stringify({ anime: anime, character: char }) // 将数据转为 JSON 字符串
        });

        // 3. 处理返回结果
        if (!response.ok) {
            throw new Error(`服务器返回状态码: ${response.status}`);
        }

        const data = await response.json();
        
        // 4. 显示最终结果
        resultText.innerText = data.analysis;

    } catch (error) {
        resultText.innerText = "出错了：" + error.message + "。如果刚启动，请等待后端唤醒后重试。";
        console.error("Error details:", error);
    }
});
