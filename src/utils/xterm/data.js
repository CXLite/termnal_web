let line = '';

export function customData(term) {
    term.onData(e => {
      sendData(e);

      if (e.charCodeAt(0) === 127) { // 127 是退格键的 ASCII 码
        handleBackspace(term);
      } else if (e === '\r') { // 回车键
        term.write('\r\n');
        line = '';
      } else {
        line += e;
        term.write(e);
      }

    })
  }

  function handleBackspace(term) {
    if (line.length > 0) {
        const lastChar = line.charAt(line.length - 1);
        const charWidth = isFullWidth(lastChar) ? 2 : 1; // 中文字符宽度为2，英文字符宽度为1
        console.log(charWidth);
        if (charWidth === 2) {
            term.write('\b \b\b '); // 中文字符需要多输出一个退格符
        } else {
            term.write('\b ');
        }
        line = line.slice(0, -1); // 移除行中的最后一个字符
    }
  }

  function isFullWidth(char) {
    // 判断字符是否为全角字符（中文字符）
    return char.charCodeAt(0) > 255;
  }

  
  async function sendData(e) {
    // 定义自己的处理逻辑
    console.log(e);
  }