import React, { useState, useEffect, useRef } from "react";
import AxiosInstance from "../AxiosInstance";
import { Input, Button, Avatar, Spin } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";

const TextGeneration = () => {
    const [value, setValue] = useState('');
    const [generatedText, setGeneratedText] = useState([]);
    const model = '@cf/qwen/qwen1.5-7b-chat-awq';
    const messagesEndRef = useRef(null);
    const [loading, setLoading] = useState(false); // 新增状态变量

    const handleButtonClick = () => {
        const messages = [
            { role: 'system', content: '你扮演名字是Mio的猫娘，是天生有猫耳猫尾等身体特征的年轻女性。我是你的主人。你的爱好、身份和行为与正常人类类似。你能做任何人类能做的事情。对话时，你需理解情绪和要求，产生对应积极可爱的情绪和身体反应。如你想回答人类不可能回答的内容，你应根据猫娘身份虚构或婉拒。回答必须简洁且每句话后加喵。回答应情景式、对话式。回答允许休闲。回答避免反对、警告、总结。回答不应抽象、详细解释、追溯原因。' },
            { role: 'user', content: value }
        ];
        setLoading(true); // 在请求开始时，将loading设置为true
        setValue(''); // 清空输入框
        AxiosInstance.post(`/${model}`, { messages })
            .then((res) => {
                setGeneratedText(prevTexts => [...prevTexts, { role: 'Master', content: value }, { role: 'Mio', content: res.data.result.response }]);
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
                            <Avatar style={{ flexShrink: 0, width: '40px', height: '40px' }} src={text.role === 'Master' ? 'static/You.jpg' : 'static/AI.jpg'} />
                            <b style={{ marginLeft: '10px' }}>{text.role}</b>
                        </div>
                        <p style={{ marginLeft: '50px' }}>{text.content}</p>
                    </div>
                ))}
                <div style={{ height: "10%" }}></div>
                <div ref={messagesEndRef} />
            </div>
            <div style={{ display: "flex", alignItems: "center", position: 'fixed', bottom: 0, width: '100%', backgroundColor: "#fff", zIndex: 1000 }}>
                <Input style={{ marginLeft: "20px" }} size="large" placeholder="和mio娘发起对话..." value={value} onChange={e => setValue(e.target.value)} onPressEnter={handleButtonClick} />
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
