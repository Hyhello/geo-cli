# @hyhello/geo-cli

基于GeoJson的工程工具性能优化。

## 安装

虽然你可以在你的机器上全局安装Geo CLI，但是最好在本地逐个项目安装它。
这主要有两个原因。

1. 同一台机器上的不同项目可能依赖于不同版本的Geo，允许您分别更新它们。

2. 没有对工作环境的隐式依赖可以使项目更易于移植和设置。

我们可以通过运行以下命令在本地安装Geo CLI:


```Shell
npm install --save-dev @hyhello/geo-cli
```

> **Note:** 如果你没有一个package.son，在安装之前创建一个。这将确保与npx命令的正确交互。

完成安装后, package.json 文件应包括:

```Diff
{
    "devDependencies": {
+       "@hyhello/geo-cli": "^0.0.4"
    }
}
```

## Examples (Run it and see it)

检查 [`examples/`](https://github.com/Hyhello/geo-cli/tree/master/examples) 用于代码和接口示例的文件夹.

```Shell
node examples/demo.json
# etc...
```

## Usage

> **Note:** 请在npx geo之前先安装@hyhello/cli，你也可以把它放到npm运行脚本中，或者用相对路径来执行. ./node_modules/.bin/geo

```Shell
npx geo demo.json
```

### input or output

编译文件demo.Json并覆盖源文件.

```Shell
npx geo demo.json
# overwrite demo.json
```

如果你想输入到一个文件或目录，你可以使用 --input 或 -i.

```Shell
npx geo --input demo.json
```

如果你想输出到一个文件或目录，你可以使用 --output 或 -o.

```Shell
npx geo demo.json --output other.json
```

### pretty

美化JSON文件，你可以使用 --pretty or -p [number|boolean]

```Shell
npx geo demo.json --pretty
```

以上缩进为 2

如果你想自定义缩进，你可以 --pretty=[number]

```Shell
npx geo demo.json --pretty=4
```

### recursive

如果--input是一个文件夹，你想递归地找到所有JSON文件在文件夹中，您可以使用 --recursive or -r

```Shell
npx geo --input examples --recursive
```

### relative

如果--input是一个文件夹, 而您不想保留以前的目录结构，可以使用 --relative

```Shell
npx geo --input examples --relative false
```

### emptyDir

如果您--output是一个文件夹，并且希望在编译之前清空它

```Shell
npx geo --input examples -o output --empty-dir
```

### exclude

排除匹配正则表达式模式的文件

--exclude or -e

```Shell
npx geo examples --exclude examples/other.json
```

### Custom config path

自定义配置文件。只支持.js文件

--config-file or -c

```Shell
npx geo demo.json --config-file geo.config.js
```

如果你不知道如何配置它，你可以执行 geo --init

```Shell
npx geo --init
```

### help

--help or -h

```Shell
npx geo --help
```

### version

--version or -v

```Shell
npx geo --help
```

