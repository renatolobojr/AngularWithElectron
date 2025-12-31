const { app, BrowserWindow, Menu, dialog, shell } = require('electron');
const path = require('path');
const url = require('url');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false, 
    maximizable: false,
    useContentSize: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  const template = [
    // --- MENU ARQUIVO ---
    {
      label: 'Arquivo',
      submenu: [
        { 
          label: 'Abrir Site do Google', 
          click: async () => { 
            await shell.openExternal('https://google.com') 
          } 
        },
        { type: 'separator' }, // Uma linha divisória
        { 
          label: 'Sair', 
          role: 'quit',       // Ação nativa de fechar o app
          accelerator: 'Alt+F4' // Atalho personalizado (opcional, o role já tem padrões)
        }
      ]
    },
    
    // --- MENU EDITAR (Essencial para Ctrl+C / Ctrl+V funcionarem) ---
    {
      label: 'Editar',
      submenu: [
        { label: 'Desfazer', role: 'undo' },
        { label: 'Refazer', role: 'redo' },
        { type: 'separator' },
        { label: 'Recortar', role: 'cut' },
        { label: 'Copiar', role: 'copy' },
        { label: 'Colar', role: 'paste' },
        { label: 'Selecionar Tudo', role: 'selectAll' }
      ]
    },

    // --- MENU EXIBIR (Útil para desenvolvimento) ---
    {
      label: 'Exibir',
      submenu: [
        { label: 'Recarregar', role: 'reload' }, // F5
        { label: 'Forçar Recarregamento', role: 'forceReload' }, // Ctrl+F5
        { label: 'Ferramentas de Desenvolvedor', role: 'toggleDevTools' }, // F12
        { type: 'separator' },
        { label: 'Tela Cheia', role: 'togglefullscreen' },
        { type: 'separator' },
        // Exemplo de Checkbox
        {
          label: 'Modo Escuro (Exemplo)',
          type: 'checkbox',
          checked: true,
          click: (menuItem) => {
            console.log('Modo escuro está:', menuItem.checked);
            // Aqui você enviaria um sinal para o Angular mudar o tema
          }
        }
      ]
    },

    // --- MENU AJUDA ---
    {
      label: 'Ajuda',
      submenu: [
        {
          label: 'Sobre o App',
          click: () => {
            // Abre uma caixa de diálogo nativa do Windows
            dialog.showMessageBox({
              type: 'info',
              title: 'Sobre',
              message: 'Meu App Incrível v1.0',
              detail: 'Criado com Angular + Electron',
              buttons: ['OK']
            });
          }
        }
      ]
    }
  ];

  // 2. Constrói e Aplica o Menu
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);  

  const isDev = process.argv.slice(2).some(arg => arg === '--serve');

  if (isDev) {
    win.loadURL('http://localhost:4200');
    win.webContents.openDevTools(); // Abre o debug em dev
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/AngularWithElectron/browser/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  win.on('closed', () => {
    win = null;
  });






}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});