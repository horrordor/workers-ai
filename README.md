# workers-ai
一个调用Cloudflare Workers AI多种模型API的AI网站项目
# 功能
- 文本生成（@cf/meta/llama-2-7b-chat-int8）
- 文本翻译（@cf/meta/m2m100-1.2b）
- ~~图像分类（@cf/microsoft/resnet-50）~~
- ~~文本生图（@cf/stabilityai/stable-diffusion-xl-base-1.0）~~
# 部署方法
## 准备工作
1. 登陆Cloudflare后访问 [https://dash.cloudflare.com](https://dash.cloudflare.com/)，地址栏会出现`https://dash.cloudflare.com/xxxxxxxxx`，`xxxxxxxxx`即是你的`{ACCOUNT_ID}`，复制保存

2. 访问Cloudflare的 [API Tokens](https://dash.cloudflare.com/profile/api-tokens)，依次点击 `Create Token`--->`Workers AI (Beta) Use template`--->`Continue to summary`--->`Create Token`
**请保存好生成的Token**

## 使用 Vercel Deploy 部署
1. 点击下面的 Deploy 图标 

[![Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/barkure/workers-ai)

2. 你需要输入一个仓库名，例如：Workers-AI，点击 `Create`，等待一两分钟，构建完成后，点击`Continue to Dashboard`

3. 依次点击`Settings`--->`Environment Variables`. 
添加下面两个环境变量（请根据自己的`ACCOUNT_ID`和`Token`进行修改）：
```
REACT_APP_ACCOUNT_ID='abcdef'
REACT_APP_API_TOKEN='123456'
```

4. 环境变量添加后，点击`Deployments`，然后`Redeploy`，重新部署

5. 等待两分钟，部署完成，就可以使用了

如需自定义域名，请自行研究。

