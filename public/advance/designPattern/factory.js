// 假设我们有三个不同的构造器，它们所实现的功能是相似的。它们所创建的对
// 象都将接受一个 URL 类型的参数，但处理细节稍有不同。例如，它们分别创建的是一个文
// 本 DOM 节点、一个链接以及一个图像。

const supportDom = {
    Text: {
        // tag:'span',
        // mainAttr:'',
    },
    Link: {
        tag: 'a',
        text: 'button', // null 表示动态指定
        mainAttr: 'href',
    },
    Image: {
        tag: 'img',
        mainAttr: 'src',
    }
}

const NodeFactory = {
    build(type, ...rest) {
        return new NodeFactory[type](...rest);
    }
}
for (const key in supportDom) {
    const config = supportDom[key]
    NodeFactory[key] = function (url, otherAttrs) {
        this.url = url
        this.appendTo = (where) => {
            const { tag, mainAttr, text } = config
            let element
            if (tag) {
                element = document.createElement(tag)
                if (mainAttr) {
                    element[mainAttr] = url
                }
                if (text) {
                    element.innerText = text
                }
            } else {
                element = document.createTextNode(url)
            }

            try {
                if (otherAttrs && Object.keys(otherAttrs).length > 0) {
                    for (const key in otherAttrs) {
                        element[key] = otherAttrs[key]
                    }
                }
            } catch{
                console.error('bad params.')
            }


            where.append(element)
            return element
        }
    }

    NodeFactory[key].name = key + 'Builder'
}

const text = new NodeFactory.Text('www.baidu.com', 123)
const link = new NodeFactory.Link('http://www.baidu.com', { style: 'margin-left:20px;color:red;' })
const image = new NodeFactory.Image('http://localhost:8080/static/img/favicon.ico', { style: 'width:200px;height:200px;' })


    ; (function () {
        const container = document.querySelector('.container')
        text.appendTo(container)
        link.appendTo(container)
        image.appendTo(container)
        container.innerHTML += '<br>'
        NodeFactory.build('Text', 'www.google.com', 123).appendTo(container)
        NodeFactory.build('Link', 'http://www.baidu.com', { style: 'margin-left:20px;color:green;' }).appendTo(container)
        NodeFactory.build('Image', 'http://localhost:8080/static/img/favicon.ico', { style: '' }).appendTo(container)
    }())
