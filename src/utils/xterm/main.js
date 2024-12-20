import { Terminal } from '@xterm/xterm'
// import { WebglAddon } from '@xterm/addon-webgl'
import { FitAddon } from '@xterm/addon-fit'
import { WebLinksAddon } from '@xterm/addon-web-links'
import { AttachAddon } from '@xterm/addon-attach';
import { baseTheme } from './theme'
import { customData } from './data'

export const fitAddon = new FitAddon()

export const term = new Terminal({
  fontFamily: '"Cascadia Code", Menlo, monospace',
  theme: baseTheme,
  cursorBlink: true,
  cursorStyle: 'bar'
})

export function runFakeTerminal() {
  initializeXterm() //初始化 Xterm
  if (term._initialized) {
    return
  }
  term._initialized = true
  let banner = `
\x1b[32m  /$$$$$$  /$$   /$$ /$$       /$$   /$$              \x1b[0m\r
\x1b[32m /$$__  $$| $$  / $$| $$      |__/  | $$              \x1b[0m\r
\x1b[32m| $$  \\__/|  $$/ $$/| $$       /$$ /$$$$$$    /$$$$$$ \x1b[0m\r
\x1b[32m| $$       \\  $$$$/ | $$      | $$|_  $$_/   /$$__  $$\x1b[0m\r
\x1b[32m| $$        >$$  $$ | $$      | $$  | $$    | $$$$$$$$\x1b[0m\r
\x1b[32m| $$    $$ /$$/\\  $$| $$      | $$  | $$ /$$| $$_____/\x1b[0m\r
\x1b[32m|  $$$$$$/| $$  \\ $$| $$$$$$$$| $$  |  $$$$/|  $$$$$$$\x1b[0m\r
\x1b[32m \\______/ |__/  |__/|________/|__/   \\___/   \\_______/\x1b[0m\r
\x1b[32m                                                      \x1b[0m\r
\x1b[32m @Author: 盧瞳\x1b[0m\r\n
 `
  term.writeln(banner)
  customData(term)
}

function initializeXterm() {
  term.loadAddon(fitAddon)
  term.loadAddon(new WebLinksAddon())

  const webSocket = new WebSocket('ws://127.0.0.1:8765');
  const attachAddon = new AttachAddon(webSocket);
  term.loadAddon(attachAddon);

  term.open(document.getElementById('xterm-inner'))
  setTimeout(() => {
    fitAddon.fit()
  }, 60)
  // try {
  //   term.loadAddon(new WebglAddon())
  // } catch (e) {
  //   console.warn('WebGL addon threw an exception during load', e)
  // }
  document.querySelector('.xterm').addEventListener('wheel', handleWheel)
}

function handleWheel(e) {
  if (term.buffer.active.baseY > 0) {
    e.preventDefault()
  }
}