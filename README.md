# @hyhello/geo-cli

Engineering tool based on GeoJson performance optimization.

Read this document in: [简体中文](https://github.com/Hyhello/geo-cli/master/README.zh_CN.md).

## Installation

While you can install Geo CLI globally on your machine, it's much better to install it locally project by project.

There are two primary reasons for this.

1. Different projects on the same machine can depend on different versions of Geo allowing you to update them individually.
2. Not having an implicit dependency on the environment you are working in makes your project far more portable and easier to setup.

We can install Geo CLI locally by running:

```Shell
npm install --save-dev @hyhello/geo-cli
```

> **Note:** If you do not have a package.json, create one before installing. This will ensure proper interaction with the npx command.

After that finishes installing, your package.json file should include:

```Diff
{
    "devDependencies": {
+       "@hyhello/geo-cli": "^0.0.4"
    }
}
```

## Examples (Run it and see it)

<a name="examples"></a>

Check out the [`examples/`](https://github.com/Hyhello/geo-cli/tree/master/examples) folder for code and interface examples.

```Shell
node examples/demo.json
# etc...
```

## Usage

<a name="usage"></a>

> **Note:** Please install @hyhello/geo-cli first before npx geo, you can also drop it inside of an npm run script or you may instead execute with the relative path instead. ./node_modules/.bin/geo

```Shell
npx geo demo.json
```

### compile

Compile the file demo.json and overwrite the source file.

```Shell
npx geo demo.json
# overwrite demo.json
```

If you would like to input to a file or dir, you may use --input or -i.

```Shell
npx geo --input demo.json
```

If you would like to output to a file or dir, you may use --output or -o.

```Shell
npx geo demo.json --output other.json
```

### pretty

Beautify JSON files you may use --pretty or -p [number|boolean]

```Shell
npx geo demo.json --pretty
```

above indentation is 2

If you want to customize the indentation, you can --pretty=[number]

```Shell
npx geo demo.json --pretty=4
```

### recursive

If you --input is a folder, and you want to recursively find all .json files in the folder, you can use --recursive or -r

```Shell
npx geo --input examples --recursive
```

### relative

If you --output is a folder, and you don't want to keep the previous directory structure, you can use --relative

```Shell
npx geo --input examples --relative false
```

### emptyDir

If you --output is a folder, and you want to empty it before you compile

```Shell
npx geo --input examples -o output --empty-dir
```

### exclude

Exclude files that match the regular expression pattern

--exclude or -e

```Shell
npx geo examples --exclude examples/other.json
```

### Custom config path

Custom configuration file. only supported .js file

--config-file or -c

```Shell
npx geo demo.json --config-file geo.config.js
```

If you don't know how to configure it, you can exec geo --init

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
