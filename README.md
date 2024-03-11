```shell
# 生成示例二维码
npx @kne/miniprogram-tools qrcode
# 发布小程序
npx @kne/miniprogram-tools
```

* 需要的环境变量:

| 环境变量名称       | 说明                  | 是否必须        |
|--------------|---------------------|-------------|
| APP_ID       | 小程序APP_ID           | 是           |
| VERSION      | 要发布的小程序的版本          | 否           |
| PRIVATE_KEY  | 小程序发布密钥             | publish操作必须 |
| EXAMPLE_PATH | 小程序示例example.json路径 | 否           |
| DIST_PATH    | 生成产物目录              | 否           |
| SECRET       | 小程序token获取密钥        | qrcode操作必须  |
| PROJECT_DIR  | 小程序发布目录             | 否           |


