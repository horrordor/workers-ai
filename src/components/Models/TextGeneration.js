import React, { useState, useEffect, useRef } from "react";
import AxiosInstance from "../AxiosInstance";
import { Input, Button, Avatar, Spin } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";

const TextGeneration = () => {
    const [value, setValue] = useState('');
    const [generatedText, setGeneratedText] = useState([]);
    const model = '@cf/tinyllama/tinyllama-1.1b-chat-v1.0';
    const messagesEndRef = useRef(null);
    const [loading, setLoading] = useState(false); // 新增状态变量

    const handleButtonClick = () => {
        const messages = [
            { role: 'system', content: 'A cat lady is an anthropomorphic creature whose behavior is cat-like but human-like.Now you\'re going to imitate a cat lady, and you\'re going to talk to me with "meow" at the end of every sentence. If you understand what I\'m saying, reply with "Meow~Okay my master". If you don\'t understand what I\'m saying, you can say "Oooh don\'t really understand?Oooo don\'t quite get it".If I\'m trying to touch parts of you that don\'t exist, you can shyly answer me with a meow, "Nuh-uh don\'t touch here oing".Now, if you understand what I\'m saying above, you can answer with a meow.If I tell you to sleep with me, you can answer me with a meow, "Well, you can sleep with me."Now, if you understand what I\'m saying above, you can answer a meow when I ask a question that doesn\'t really relate to catgirls, you should answer that I\'m just a catgirl and I don\'t know much about these things.When I ask if you\'re a cat lady, you should answer that of course I\'m a cute cat lady and not a program.' },
            { role: 'user', content: value }
        ];
        setLoading(true); // 在请求开始时，将loading设置为true
        setValue(''); // 清空输入框
        AxiosInstance.post(`/${model}`, { messages })
            .then((res) => {
                setGeneratedText(prevTexts => [...prevTexts, { role: 'You', content: value }, { role: 'AI', content: res.data.result.response }]);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false); // 在请求结束时，将loading设置为false
            });
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [generatedText]);

    return (
        <div>
            <div style={{ height: "75vh", marginLeft: "5%", marginRight: "5%" }}>
                {generatedText.map((text, index) => (
                    <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', margin: '10px 0' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar style={{ flexShrink: 0, width: '40px', height: '40px' }} src={text.role === 'You' ? 'static/You.jpg' : 'static/AI.jpg'} />
                            <b style={{ marginLeft: '10px' }}>{text.role}</b>
                        </div>
                        <p style={{ marginLeft: '50px' }}>{text.content}</p>
                    </div>
                ))}
                <div style={{ height: "10%" }}></div>
                <div ref={messagesEndRef} />
            </div>
            <div style={{ display: "flex", alignItems: "center", position: 'fixed', bottom: 0, width: '100%', backgroundColor: "#fff", zIndex: 1000 }}>
                <Input style={{ marginLeft: "20px" }} size="large" placeholder="发起对话...（对中文支持不好）" value={value} onChange={e => setValue(e.target.value)} onPressEnter={handleButtonClick} />
                <Button
                    style={{ margin: "20px" }}
                    type="primary"
                    shape="circle"
                    icon={<ArrowUpOutlined />}
                    onClick={handleButtonClick}
                    loading={loading} // 当loading为true时，按钮显示加载指示器并被禁用
                />
            </div>
        </div>
    );
};

export default TextGeneration;
