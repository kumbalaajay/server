// server.js
const http = require('http');
const fs = require("fs");
const path = require("path");
const PORT = 8090;

const app = http.createServer((req, res) => {

    // if (req.url === '/' && req.method === "GET") {
    //     const myPath = path.join(__dirname, "/online_quiz/index.html")
    //     console.log(myPath);
    //     fs.readFile(myPath, 'utf-8', (err, data) => {
    //         if (!err) {
    //             res.end(data);
    //         }
    //     });
    // }
    if (req.url === "/online_quiz" && req.method === "GET") {
        const myPath = path.join(__dirname, "online_quiz/index.html");
        console.log(myPath);
        fs.readFile(myPath, "utf8", (err, data) => {
            if (!err) {
                res.end(data);
            }
        });
    }
    else if (req.url === '/online_quiz/registration' && req.method === "GET") {
        const myPath = path.join(__dirname, "online_quiz/registration.html");
        fs.readFile(myPath, "utf8", (err, data) => {
            if (!err) {
                res.end(data);
            }
        });
    }
    else if (req.url === '/online_quiz/afterlogin' && req.method === "GET") {
        const myPath = path.join(__dirname, "online_quiz/afterlogin.html");
        fs.readFile(myPath, "utf8", (err, data) => {
            if (!err) {
                res.end(data);
            }
        });
    }
    else if (req.url === '/online_quiz/registration' && req.method === "POST") {
        let body = '';
    
        req.on('data', chunk => {
            body += chunk.toString();
        });
    
        req.on('end', () => {
            const formData = new URLSearchParams(body);
            const registrationData = {
                name: formData.get('fullname'),
                email: formData.get('email'),
                password: formData.get('password'), // Ensure to handle passwords securely!
            };
    
            const jsonFilePath = path.join(__dirname, 'online_quiz/registrations.json');
            fs.readFile(jsonFilePath, 'utf8', (err, data) => {
                let registrations = [];
                if (!err && data) {
                    registrations = JSON.parse(data);
                }
    
                const email = formData.get('email');
                const emailExist = registrations.find(registration => registration.email === email);
    
                if (emailExist) {
                    const page = path.join(__dirname, 'online_quiz/alreadyRegistered.html');
                    fs.readFile(page, 'utf8', (err, data) => {
                        if (!err) {
                            res.end(data);
                        }
                    });
                } 
                else {
                    registrations.push(registrationData);
    
                    fs.writeFile(jsonFilePath, JSON.stringify(registrations, null, 2), (err) => {
                        if(!err)
                        {
                            const page = path.join(__dirname, 'online_quiz/login.html');
                            fs.readFile(page, 'utf8', (err, data) => {
                                if (!err) {
                                    res.end(data);
                                }
                            });
                        }
                    });
                }
            });
        });
    }
    else if (req.url === '/online_quiz/login' && req.method === "GET") {
        const myPath = path.join(__dirname, "online_quiz/login.html");
        fs.readFile(myPath, "utf8", (err, data) => {
            if (!err) {
                res.end(data);
            }
        });
    }
    else if ((req.url === '/online_quiz/login') && req.method === "POST") {
        let body = '';
    
        req.on('data', chunk => {
            body += chunk.toString();
        });
    
        req.on('end', () => {
            const formData = new URLSearchParams(body);
            const email = formData.get('email'); 
            const password = formData.get('password'); 
    
            const jsonFilePath = path.join(__dirname, 'online_quiz/registrations.json');
    
            fs.readFile(jsonFilePath, 'utf8', (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end("Error reading registrations data.");
                    return;
                }
    
                let registrations = JSON.parse(data || '[]');
    
                const user = registrations.find(reg => reg.email.trim().toLowerCase() === email && reg.password === password);
    
                if (user) {
                    const myPath = path.join(__dirname, "online_quiz/afterlogin.html");
                    fs.readFile(myPath, "utf8", (err, data) => {
                        if (!err) {
                            // res.writeHead(302, { Location: 'online_quiz' });

                            res.end(data);
                        }
                    });
                } else {
                    const myPath = path.join(__dirname, "online_quiz/login.html");
                    fs.readFile(myPath, "utf8", (err, data) => {
                        if (!err) {
                            res.end(data);
                        }
                    });
                }
            });
        });
    }
    else if (req.url === '/online_quiz/CN' && req.method === "GET") {
        const myPath = path.join(__dirname, "online_quiz/CN.html");
        fs.readFile(myPath, "utf8", (err, data) => {
            if (!err) {
                res.end(data);
            }
        });
    }
    else if (req.url === '/online_quiz/DMT' && req.method === "GET") {
        const myPath = path.join(__dirname, "online_quiz/DMT.html");
        fs.readFile(myPath, "utf8", (err, data) => {
            if (!err) {
                res.end(data);
            }
        });
    }
    else if (req.url === '/online_quiz/CD' && req.method === "GET") {
        const myPath = path.join(__dirname, "online_quiz/CD.html");
        fs.readFile(myPath, "utf8", (err, data) => {
            if (!err) {
                res.end(data);
            }
        });
    }
    else if (req.url === '/online_quiz/AI' && req.method === "GET") {
        const myPath = path.join(__dirname, "online_quiz/AI.html");
        fs.readFile(myPath, "utf8", (err, data) => {
            if (!err) {
                res.end(data);
            }
        });
    }
    else if (req.url === '/online_quiz/ML' && req.method === "GET") {
        const myPath = path.join(__dirname, "online_quiz/ML.html");
        fs.readFile(myPath, "utf8", (err, data) => {
            if (!err) {
                res.end(data);
            }
        });
    }
    else if (req.url === '/online_quiz/MSD' && req.method === "GET") {
        const myPath = path.join(__dirname, "online_quiz/MSD.html");
        fs.readFile(myPath, "utf8", (err, data) => {
            if (!err) {
                res.end(data);
            }
        });
    }
    else if (req.url.startsWith('/online_quiz/quiz-result') && req.method === "GET") {
        const myPath = path.join(__dirname, "online_quiz/quiz-result.html");
        fs.readFile(myPath, "utf8", (err, data) => {
            if (!err) {
                res.end(data);
            } 
        });
    }
    
    else if (req.url === '/online_quiz/forgot-password' && req.method === "GET") {
        const myPath = path.join(__dirname, "online_quiz/forgot-password.html");
        fs.readFile(myPath, "utf8", (err, data) => {
            if (!err) {
                res.end(data);
            } 
        });
    }

    else {
        res.end("No data");
    }
});

app.listen(PORT, () => {
    console.log(`http://localhost:8090/online_quiz`);
});