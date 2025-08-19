console.log("Test API..."); fetch("http://localhost:5001/api/server").then(r => r.json()).then(d => console.log("API Response:", d)).catch(e => console.error("API Error:", e));
