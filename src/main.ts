
import { app, BrowserWindow } from 'electron'
import * as path from 'path'

async function createWindow (): Promise<void> {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  const indexPath = path.join(__dirname, '../index.html')
  await mainWindow.loadFile(indexPath)
  mainWindow.webContents.openDevTools()
}

function start (): void {
  app.whenReady().then(async () => {
    await createWindow()
  }).catch(() => {

  })
}

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

start()
