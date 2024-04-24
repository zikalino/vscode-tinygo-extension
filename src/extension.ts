import * as vscode from 'vscode';
import YAML from 'yaml';
import { marked } from 'marked';
import { GenericWebView } from './vscode-helper-toolkit/src/genericwebview';

var extensionUri: vscode.Uri;
var mediaFolder: vscode.Uri;
var extensionContext: vscode.ExtensionContext;

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate (context: vscode.ExtensionContext) {
  extensionContext = context;
  extensionUri = context.extensionUri;

  mediaFolder = vscode.Uri.joinPath(extensionUri, 'media');

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "vscode-tinygo-extension" is now active!');

  let disposable = vscode.commands.registerCommand(
    'vscode-tinygo-extension.generateTest',
    () => {
      generateTest();
    }
  );

  disposable = vscode.commands.registerCommand(
    'vscode-tinygo-extension.generateConsoleApplication',
    () => {
      generateConsoleApplication();
    }
  );

  disposable = vscode.commands.registerCommand(
    'vscode-tinygo-extension.generateAtCommandHandler',
    () => {
      generateAtCommandHandler();
    }
  );

  disposable = vscode.commands.registerCommand(
    'vscode-tinygo-extension.generateStandardApi',
    () => {
      generateStandardApi();
    }
  );

  disposable = vscode.commands.registerCommand(
    'vscode-tinygo-extension.generateRestApi',
    () => {
      generateRestApi();
    }
  );

  disposable = vscode.commands.registerCommand('vscode-tinygo-extension.manageSdks', () => {
    manageSdks();
  });

  disposable = vscode.commands.registerCommand('vscode-tinygo-extension.welcomeA', () => {
    welcomeA();
  });

  disposable = vscode.commands.registerCommand('vscode-tinygo-extension.browseExamples', () => {
    browseExamples();
  });

  disposable = vscode.commands.registerCommand(
    'vscode-tinygo-extension.manageSettings',
    () => {
      manageSettings();
    }
  );

  disposable = vscode.commands.registerCommand(
    'vscode-tinygo-extension.displayGenericForm',
    () => {
      displayGenericForm();
    }
  );

  disposable = vscode.commands.registerCommand('vscode-tinygo-extension.newProject', () => {
    newProject();
  });

  disposable = vscode.commands.registerCommand('vscode-tinygo-extension.newProjectX', () => {
    newProjectX();
  });

  disposable = vscode.commands.registerCommand('vscode-tinygo-extension.guiDesigner', () => {
    guiDesigner();
  });

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate () {}

async function guiDesigner () {
  const panel = vscode.window.createWebviewPanel(
    'guiDesigner',
    'GUI Designer',
    vscode.ViewColumn.One,
    {
      enableScripts: true,
      localResourceRoots: [mediaFolder]
    }
  );

  panel.iconPath = vscode.Uri.joinPath(
    extensionContext.extensionUri,
    'media',
    'espressif.svg'
  );
  panel.webview.html = getWebviewContent();
}

async function manageSdks () {
  let formDefinition = {
    type: 'layout-form',
    id: 'root',
    header: [
      {
        type: 'header',
        title: 'Manage SDKs and Toolchains'
      }
    ],
    form: [
      {
        type: 'panels',
        id: 'panelsxxxx',
        subitems: [
          {
            type: 'panel',
            id: 'pana',
            label: 'Installed',
            subitems: [
              {
                type: 'datagrid',
                id: 'gridxxx',
                subitems: [
                  {
                    type: 'grid-header',
                    id: 'gra',
                    subitems: [
                      {
                        type: 'grid-header-cell',
                        id: 'head1',
                        content: 'Type'
                      },
                      {
                        type: 'grid-header-cell',
                        id: 'head2',
                        content: 'Version'
                      },
                      {
                        type: 'grid-header-cell',
                        id: 'head3',
                        content: 'Location'
                      },
                      {
                        type: 'grid-header-cell',
                        id: 'head4',
                        content: 'Actions'
                      }
                    ]
                  },
                  {
                    type: 'grid-row',
                    id: 'gr1',
                    subitems: [
                      {
                        type: 'grid-cell',
                        id: 'gr1c1',
                        content: 'ESP-IDF'
                      },
                      {
                        type: 'grid-cell',
                        id: 'gr1c2',
                        content: 'v5.1.2'
                      },
                      {
                        type: 'grid-cell',
                        id: 'gr1c3',
                        content: 'c:/users/zim/esp/v5.1.2/esp-idf'
                      },
                      {
                        type: 'grid-cell',
                        id: 'gr1c4',
                        content: '<a title="Delete this SDK" class="tooltip codicon codicon-trash"></a><a title="Verify / Synchronize this SDK" class="tooltip codicon codicon-sync"></a>'
                      }
                    ]
                  },
                  {
                    type: 'grid-row',
                    id: 'gr2',
                    subitems: [
                      {
                        type: 'grid-cell',
                        id: 'gr2c1',
                        content: 'ESP-IDF'
                      },
                      {
                        type: 'grid-cell',
                        id: 'gr2c2',
                        content: 'v5.1.3'
                      },
                      {
                        type: 'grid-cell',
                        id: 'gr2c3',
                        content: 'c:/users/zim/esp/v5.1.3/esp-idf'
                      },
                      {
                        type: 'grid-cell',
                        id: 'gr2c4',
                        content: '<a title="Delete this SDK" class="tooltip codicon codicon-trash"></a><a title="Verify / Synchronize this SDK" class="tooltip codicon codicon-sync"></a>'
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            type: 'panel',
            id: 'panb',
            label: 'Install New',
            subitems: [
              {
                type: 'fieldset',
                id: 'fieldset_1',
                subitems: [
                  {
                    type: 'row',
                    id: 'row_1',
                    subitems: [
                      {
                        type: 'combo',
                        id: 'sdk_type',
                        name: 'SDK Type',
                        items: [
                          { name: 'ESP-IDF', description: 'Espressif ESP-IDF IoT Development Framework' }
                        ]
                      },
                      {
                        type: 'combo',
                        id: 'sdk_version',
                        name: 'Version',
                        items: [
                          'v5.1.3',
                          'v5.1.2',
                          'develop'
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                type: 'fieldset',
                id: 'fieldset_2',
                subitems: [
                  {
                    type: 'row',
                    id: 'row_2',
                    subitems: [
                      {
                        type: 'textfield',
                        id: 'project-name',
                        name: 'Project Name'
                      }
                    ]
                  }
                ]
              }        
            ]
          }
        ]
      }
    ]
  };

  let view = new GenericWebView(extensionContext, "Manage SDKs");
  view.createPanel(formDefinition);
}

async function welcomeA() {

  let formDefinition = {
    type: 'layout-welcome',
    header: [
      {
        type: 'header',
        title: 'Espressif Extension'
      }
    ],
    footer: [
      {
        type: 'checkbox',
        id: 'show_on_startup',
        name: 'Show welcome page on startup',
        'vertical-alignment': 'center'
      }
    ],
    'left-column': [
          {
            type: 'text-block',
            font: 'header-2',
            width: 'narrow',
            content: "Get Started"
          },
          {
            type: 'tile',
            width: 'narrow',
            title: 'Install SDK and Toolchains',
            content: 'Before you can start using this extension, ESP-IDF and toolchains need to be installed. Press <b>Default</b> to install latest version of ESP-IDF in default folder. Alternatively press <b>Advanced</b> to customize your setup.',
            buttons: [ 'Default|codicon-gear|xxx-action', 'Advanced|codicon-settings|xxx-action']
          },
          {
            type: 'tile',
            width: 'narrow',
            title: 'Create a New Project',
            content: 'Once SDK and Tools are installed, you can create a new project. You can either start with Hello World project or use Example Browser to choose one of the examples.',
            buttons: [ 'Hello World!|codicon-gear|xxx-action', 'Browse Examples|codicon-list-selection|xxx-action']
          },
          {
            type: 'tile',
            width: 'narrow',
            title: 'Connect Your Board',
            content: 'Press <b>Connect</b> button below to discover your board.',
            buttons: [ 'Connect|codicon-plug|xxx-action']
          }    
      ],
      'right-column': [
        {
          type: 'text-block',
          font: 'header-2',
          width: 'narrow',
          content: "Useful Links"
        },
        {
          type: 'link',
          href: 'https://google.com',
          title: "Repository",
          codicon: "codicon-github"
        },
        {
          type: 'link',
          href: 'https://bing.com',
          title: "ESP32 Forums",
          codicon: "codicon-comment"
        },
        {
          type: 'link',
          href: 'https://bing.com',
          title: "ESP-IDF",
          codicon: "codicon-github"
        },
        {
          type: 'link',
          href: 'https://bing.com',
          title: "Open a New Issue",
          codicon: "codicon-github"
        },
        {
          type: 'text-block',
          font: 'header-3',
          width: 'narrow',
          content: "Tutorials"
        },
        {
          type: 'link',
          href: 'https://bing.com',
          title: "Install and Configure"
        },
        {
          type: 'link',
          href: 'https://bing.com',
          title: "Basic Use"
        },
        {
          type: 'link',
          href: 'https://bing.com',
          title: "Debugging"
        },

        {
          type: 'text-block',
          font: 'header-3',
          width: 'narrow',
          content: "Documentation"
        },
        {
          type: 'link',
          href: 'https://bing.com',
          title: "XXX-1"
        },
        {
          type: 'link',
          href: 'https://bing.com',
          title: "XXX-2"
        },
        {
          type: 'link',
          href: 'https://bing.com',
          title: "XXX-3"
        }
      ]
    };

  let view = new GenericWebView(extensionContext, "Welcome!");
  view.createPanel(formDefinition);
}

async function browseExamples() {


  let populateMsg = {
    command: 'populate',
    data: {}
  };

  let setActionsMsg = {
    command: 'actions',
    data: [
      {
        codicon: 'codicon-folder-opened',
        description: 'Create Project',
        action: 'action-oprn'
      },
      {
        codicon: 'codicon-github',
        description: 'Open on Github',
        action: 'action-github'
      },
      {
        codicon: 'codicon-comment-discussion',
        description: 'Discuss',
        action: 'action-discussion'
      }
    ]
  };

  let html = `

  | Supported Targets | ESP32 | ESP32-C2 | ESP32-C3 | ESP32-C6 | ESP32-H2 | ESP32-P4 | ESP32-S2 | ESP32-S3 | Linux |
  | ----------------- | ----- | -------- | -------- | -------- | -------- | -------- | -------- | -------- | ----- |
  
  # Hello World Example
  
  Starts a FreeRTOS task to print "Hello World".
  
  (See the README.md file in the upper level 'examples' directory for more information about examples.)
  
  ## How to use example
  
  Follow detailed instructions provided specifically for this example.
  
  Select the instructions depending on Espressif chip installed on your development board:
  
  - [ESP32 Getting Started Guide](https://docs.espressif.com/projects/esp-idf/en/stable/get-started/index.html)
  - [ESP32-S2 Getting Started Guide](https://docs.espressif.com/projects/esp-idf/en/latest/esp32s2/get-started/index.html)
  
  
  ## Example folder contents
  
  The project **hello_world** contains one source file in C language [hello_world_main.c](main/hello_world_main.c). The file is located in folder [main](main).
  
  ESP-IDF projects are built using CMake. The project build configuration is contained in CMakeLists.txt files that provide set of directives and instructions describing the project's source files and targets (executable, library, or both).
  
  Below is short explanation of remaining files in the project folder.
  
  
  ├── CMakeLists.txt
  ├── pytest_hello_world.py      Python script used for automated testing
  ├── main
  │   ├── CMakeLists.txt
  │   └── hello_world_main.c
  └── README.md                  This is the file you are currently reading
  
  
  For more information on structure and contents of ESP-IDF projects, please refer to Section [Build System](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-guides/build-system.html) of the ESP-IDF Programming Guide.
  
  ## Troubleshooting
  
  * Program upload failure
  
      * Hardware connection is not correct: run idf.py -p PORT monitor, and reboot your board to see if there are any output logs.
      * The baud rate for downloading is too high: lower your baud rate in the menuconfig menu, and try again.
  
  ## Technical support and feedback
  
  Please use the following feedback channels:
  
  * For technical queries, go to the [esp32.com](https://esp32.com/) forum
  * For a feature request or bug report, create a [GitHub issue](https://github.com/espressif/esp-idf/issues)
  
  We will get back to you as soon as possible.
  
  
    `;

  let rootMarkup = `
  # Examples

  This directory contains a range of example ESP-IDF projects. These examples are intended to demonstrate parts of the ESP-IDF functionality, and to provide code that you can copy and adapt into your own projects.
  
  ## Example Layout
  
  The examples are grouped into subdirectories by category. Each category directory contains one or more example projects:
  
  - 'bluetooth/bluedroid' Classic BT, BLE and coex examples using default Bluedroid host stack.
  - 'bluetooth/nimble' BLE examples using NimBLE host stack.
  - 'bluetooth/esp_ble_mesh' ESP BLE Mesh examples.
  - 'bluetooth/hci' HCI transport (VHCI and HCI UART) examples.
  - 'build_system' Examples of build system features.
  - 'cxx' C++ language utilization examples and experimental components.
  - 'ethernet' Ethernet network examples.
  - 'get-started' Simple examples with minimal functionality. Good start point for beginners.
  - 'mesh' Wi-Fi Mesh examples.
  - 'network' Examples related to general network environment, test & analysis.
  - 'openthread' OpenThread examples.
  - 'peripherals' Examples showing driver functionality for the various onboard ESP32 peripherals.
  - 'protocols' Examples showing network protocol interactions.
  - 'provisioning' Wi-Fi provisioning examples.
  - 'security' Examples about security features.
  - 'storage' Examples showing data storage methods using SPI flash, external storage like the SD/MMC interface and flash partitioning.
  - 'system' Demonstrates some internal chip features, or debugging & development tools.
  - 'wifi' Advanced Wi-Fi features (For network protocol examples, see 'protocols' instead.)
  - 'Zigbee' Zigbee network and device examples.
  
  In addition to these examples, 'commmon_components' directory contains code shared by several examples.
  
  ## Using Examples
  
  Before building an example, be sure to follow the [ESP-IDF Getting Started Guide](https://idf.espressif.com/) to ensure you have the required development environment.
  
  Building an example is the same as building any other project:
  
  - Change into the directory of the new example you'd like to build.
  - Run 'idf.py set-target TARGET' to select the correct chip target to build before opening the project configuration menu. By default the target is 'esp32'. For all options see 'idf.py set-target --help'
  - Run 'idf.py menuconfig' to open the project configuration menu. Most examples have a project-specific "Example Configuration" section here (for example, to set the WiFi SSID & password to use).
  - 'idf.py build' to build the example.
  - Follow the printed instructions to flash, or run 'idf.py -p PORT flash'.
    `;

  let nodeMarkup = `
# Example

This directory contains a range of example ESP-IDF projects. These examples are intended to demonstrate parts of the ESP-IDF functionality, and to provide code that you can copy and adapt into your own projects.

## Example Layout

Just something should go here....
`;

  let detailsMsgHello = {
    command: 'details',
    data:
      "<div style='padding-left: 24px; padding-right: 24px; padding-top: 4px; width=100%; text-wrap: wrap;'>" +
      marked.parse(html) +
      '</div>'
  };

  let detailsMsgRoot = {
    command: 'details',
    data:
      "<div style='padding-left: 24px; padding-right: 24px; padding-top: 4px; width=100%; text-wrap: wrap;'>" +
      marked.parse(rootMarkup) +
      '</div>'
  };

  let detailsMsgNode = {
    command: 'details',
    data:
      "<div style='padding-left: 24px; padding-right: 24px; padding-top: 4px; width=100%;' text-wrap: wrap;>" +
      marked.parse(nodeMarkup) +
      '</div>'
  };

  let formDefinition = {
    type: 'layout-tree-with-details',
    id: 'layout'
    };

  let view = new GenericWebView(extensionContext, "Examples");

  view.MsgHandler = function (msg: any) {
    switch (msg.command) {
      case 'ready':
        view.postMessage(populateMsg);
        view.postMessage(detailsMsgRoot);
        return;
      case 'selected':
        // XXX - here we can load html content of the example
        if (msg.type === 'none') {
          view.postMessage(detailsMsgRoot);
        }
        if (msg.type === 'node') {
          view.postMessage(detailsMsgNode);
        }
        if (msg.type === 'leaf') {
          view.postMessage(detailsMsgHello);
          view.postMessage(setActionsMsg);
        }

        return;
      default:
        console.log('XXX');
    }


  };

  view.createPanel(formDefinition);
}


async function manageSettings () {
  const panel = vscode.window.createWebviewPanel(
    'manageSettings', // Identifies the type of the webview. Used internally
    'SDK Settings', // Title of the panel displayed to the user
    vscode.ViewColumn.One, // Editor column to show the new webview panel in.
    {
      enableScripts: true
      //localResourceRoots: [mediaFolder, vscode.Uri.joinPath(extensionUri, 'node_modules', '@vscode/codicons', 'dist')]
    }
  );

  panel.iconPath = vscode.Uri.joinPath(
    extensionContext.extensionUri,
    'media',
    'espressif.svg'
  );

  var content = getWebviewContentSettings();
  const codiconsUri = panel.webview
    .asWebviewUri(
      vscode.Uri.joinPath(
        extensionUri,
        'node_modules',
        '@vscode/codicons',
        'dist',
        'codicon.css'
      )
    )
    .toString();
  const styleUri = panel.webview
    .asWebviewUri(vscode.Uri.joinPath(extensionUri, 'media', 'styles.css'))
    .toString();
  const uiToolkitUri = panel.webview
    .asWebviewUri(
      vscode.Uri.joinPath(extensionUri, 'media', 'webview-with-tree.js')
    )
    .toString();
  content = content.replace('${codiconsUri}', codiconsUri);
  content = content.replace('${styleUri}', styleUri);
  content = content.replaceAll('${webview.cspSource}', panel.webview.cspSource);
  content = content.replace('${webviewUri}', uiToolkitUri);

  let configMsg = {
    command: 'config',
    data: {
      maxStickyHeadersVisible: 3
    }
  };

  panel.webview.html = content;
  let populateMsg = {
    command: 'populate',
    data: [
      {
        name: 'Section 1',
        id: 'section_1',
        subitems: [
          {
            name: 'AAAX',
            id: 'section_1_aaa'
          },
          {
            name: 'BBB',
            id: 'section_1_bbb',
            subitems: [
              {
                name: 'subsubsub 1',
                id: 'section_1_aaa_s1'
              },
              {
                name: 'subsubsub 2',
                id: 'section_1_aaa_s2'
              }
            ]
          }
        ]
      },
      {
        name: 'Section 2',
        id: 'section_2',
        subitems: [
          {
            name: 'CCC',
            id: 'section_1_ccc'
          },
          {
            name: 'DDD',
            id: 'section_1_ddd'
          }
        ]
      },
      {
        name: 'Section 3',
        id: 'section_3'
      }
    ]
  };

  panel.webview.onDidReceiveMessage(
    message => {
      switch (message.command) {
        case 'ready':
          panel.webview.postMessage(populateMsg);
          panel.webview.postMessage(configMsg);
          return;
      }
    },
    undefined,
    extensionContext.subscriptions
  );
}

//import examples = require('./examples.json');

async function displayGenericForm () {

  let formDefinition = [
    {
      type: 'header',
      title: 'Manage SDKs and Toolchains (DGF)'
    },
    {
      type: 'panels',
      id: 'panelsxxxx',
      subitems: [
        {
          type: 'panel',
          id: 'pana',
          label: 'Installed',
          subitems: [
            {
              type: 'datagrid',
              id: 'gridxxx',
              subitems: [
                {
                  type: 'grid-header',
                  id: 'gra',
                  subitems: [
                    {
                      type: 'grid-header-cell',
                      id: 'head1',
                      content: 'Type'
                    },
                    {
                      type: 'grid-header-cell',
                      id: 'head2',
                      content: 'Version'
                    },
                    {
                      type: 'grid-header-cell',
                      id: 'head3',
                      content: 'Location'
                    },
                    {
                      type: 'grid-header-cell',
                      id: 'head4',
                      content: 'Actions'
                    }
                  ]
                },
                {
                  type: 'grid-row',
                  id: 'gr1',
                  subitems: [
                    {
                      type: 'grid-cell',
                      id: 'gr1c1',
                      content: 'ESP-IDF'
                    },
                    {
                      type: 'grid-cell',
                      id: 'gr1c2',
                      content: 'v5.1.2'
                    },
                    {
                      type: 'grid-cell',
                      id: 'gr1c3',
                      content: 'c:/users/zim/esp/v5.1.2/esp-idf'
                    },
                    {
                      type: 'grid-cell',
                      id: 'gr1c4',
                      content: '<a title="Delete this SDK" class="tooltip codicon codicon-trash"></a><a title="Verify / Synchronize this SDK" class="tooltip codicon codicon-sync"></a>'
                    }
                  ]
                },
                {
                  type: 'grid-row',
                  id: 'gr2',
                  subitems: [
                    {
                      type: 'grid-cell',
                      id: 'gr2c1',
                      content: 'ESP-IDF'
                    },
                    {
                      type: 'grid-cell',
                      id: 'gr2c2',
                      content: 'v5.1.3'
                    },
                    {
                      type: 'grid-cell',
                      id: 'gr2c3',
                      content: 'c:/users/zim/esp/v5.1.3/esp-idf'
                    },
                    {
                      type: 'grid-cell',
                      id: 'gr2c4',
                      content: '<a title="Delete this SDK" class="tooltip codicon codicon-trash"></a><a title="Verify / Synchronize this SDK" class="tooltip codicon codicon-sync"></a>'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          type: 'panel',
          id: 'panb',
          label: 'Install New',
          subitems: [
            {
              type: 'fieldset',
              id: 'fieldset_1',
              subitems: [
                {
                  type: 'row',
                  id: 'row_1',
                  subitems: [
                    {
                      type: 'combo',
                      id: 'sdk_type',
                      name: 'SDK Type',
                      items: [
                        { name: 'ESP-IDF', description: 'Espressif ESP-IDF IoT Development Framework' }
                      ]
                    },
                    {
                      type: 'combo',
                      id: 'sdk_version',
                      name: 'Version',
                      items: [
                        { name: 'v5.1.3', description: 'Latest version of ESP-IDF' },
                        { name: 'v5.1.2', description: 'Stable version of ESP-IDF' },
                        { name: 'develop', description: 'Develop branch' },
                      ]
                    }
                  ]
                }
              ]
            },
            {
              type: 'fieldset',
              id: 'fieldset_2',
              subitems: [
                {
                  type: 'row',
                  id: 'row_2',
                  subitems: [
                    {
                      type: 'input',
                      id: 'project-name',
                      name: 'Project Name'
                    },
                    {
                      type: 'button',
                      id: 'buttonx'
                    },
                    {
                      type: 'textarea',
                      id: 'textareax'
                    },
                    {
                      type: 'textfield',
                      id: 'textfieldx'
                    },
                    {
                      type: 'progressring'
                    },
                    {
                      type: 'tag'
                    },
                    {
                      type: 'badge'
                    },
                    {
                      type: 'link'
                    },
        
                    {
                      type: 'radiogroup',
                      subitems: [
                        {
                          type: 'radio'
                        },
                        {
                          type: 'radio'
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              type: 'fieldset',
              id: 'fieldset_3',
              subitems: [
                {
                  type: 'row',
                  id: 'row_3',
                  subitems: [
                    {
                      type: 'datagrid',
                      id: 'gridxxx',
                      subitems: [
                        {
                          type: 'gridrow',
                          id: 'gra',
                          subitems: [
                            {
                              type: 'gridcell',
                              id: 'gc1'
                            },
                            {
                              type: 'gridcell',
                              id: 'gc2'
                            }
                          ]
                        },
                        {
                          type: 'gridrow',
                          id: 'grb',
                          subitems: [
                            {
                              type: 'gridcell',
                              id: 'gc1a'
                            },
                            {
                              type: 'gridcell',
                              id: 'gc2b'
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
        
          ]
        }
      ]
    }
  ];

  let view = new GenericWebView(extensionContext, "Generic");
  view.createPanel(formDefinition);
}

async function newProject () {
  const panel = vscode.window.createWebviewPanel(
    'catCoding', // Identifies the type of the webview. Used internally
    'New Project',
    vscode.ViewColumn.One,
    {
      enableScripts: true
      //localResourceRoots: [mediaFolder, vscode.Uri.joinPath(extensionUri, 'node_modules', '@vscode/codicons', 'dist')]
    } // Webview options. More on these later.
  );
  panel.iconPath = vscode.Uri.joinPath(
    extensionContext.extensionUri,
    'media',
    'espressif.svg'
  );

  var content = getWebviewConentNewProject();
  const codiconsUri = panel.webview
    .asWebviewUri(
      vscode.Uri.joinPath(
        extensionUri,
        'node_modules',
        '@vscode/codicons',
        'dist',
        'codicon.css'
      )
    )
    .toString();
  const styleUri = panel.webview
    .asWebviewUri(vscode.Uri.joinPath(extensionUri, 'media', 'styles.css'))
    .toString();
  const uiToolkitUri = panel.webview
    .asWebviewUri(vscode.Uri.joinPath(extensionUri, 'out', 'webview.js'))
    .toString();
  content = content.replace('${codiconsUri}', codiconsUri);
  content = content.replace('${styleUri}', styleUri);
  content = content.replaceAll('${webview.cspSource}', panel.webview.cspSource);
  content = content.replace('${webviewUri}', uiToolkitUri);

  panel.webview.html = content;
}

async function newProjectX () {

  let formDefinition = {
    type: 'layout-form',
    id: 'root',
    header: [
      {
        type: 'header',
        title: 'New Project X'
      },
    ],
    form: [
      {
        type: 'fieldset',
        id: 'fieldset_1',
        subitems: [
          {
            type: 'row',
            id: 'row_1',
            subitems: [
              {
                type: 'combo',
                id: 'platform',
                name: 'Platform',
                items: [
                  { name: 'ESP-IDF', description: 'Espressif ESP-IDF IoT Development Framework' },
                  { name: 'Arduino on ESP-IDF', description: 'Create Arduino as a component project'},
                  { name: 'Rust', description: 'Create a Rust Project'},
                  { name: 'Zephyr', description: 'Create a Zephyr Project'},
                  { name: 'NuttX', description: 'Create a NuttX Project'}
                ]
              },
              {
                type: 'combo',
                id: 'project_type',
                name: 'Project Type',
                items: [
                  { name: 'Empty Project', description: 'Create an Empty Project' },
                  { name: 'GUI Project', description: 'Create an Empty GUI Project' },
                  { name: 'Use Example', description: 'Create a Project from Selected Example' },
                  { name: 'Copy Existing', description: 'Create from Existing Project'},
                  { name: 'Import PlatformIO Project', description: 'Create from Existing ESP-IDF Project Created with PlatformIO'}
                ]
              },
              {
                type: 'combo',
                id: 'target',
                name: 'Target',
                items: [
                  'All',
                  'ESP32',
                  'ESP32-S2',
                  'ESP32-S3',
                  'ESP32-C2',
                  'ESP32-C3',
                  'ESP32-C6',
                  'ESP32-H2',
                  'ESP32-P4'
                ]
              }
            ]
          },
          {
            type: 'row',
            id: 'row_2',
            subitems: [
              {
                type: 'combo',
                id: 'idf_instance',
                name: 'Select ESP-IDF Instance',
                items: [
                  { name: 'ESP-IDF 5.0', description: 'Release Version' },
                  { name: 'ESP-IDF 5.3', description: 'Release Version' },
                ]
              }
            ]
          }

        ]
      },
      {
        type: 'fieldset',
        id: 'fieldset_2',
        subitems: [
          {
            type: 'row',
            id: 'xrow_1',
            narrow: true,
            subitems: [
              {
                type: 'textfield',
                id: 'project_name',
                name: 'Project Name'
              },
            ]
          },
          {
            type: 'row',
            id: 'xrow_2',
            narrow: true,
            subitems: [
              {
                type: 'textfield',
                id: 'project_location',
                name: 'Project Location'
              }
            ]
          },
          {
            type: 'row',
            id: 'xrow_3',
            narrow: true,
            subitems: [
              {
                type: 'checkbox',
                id: 'initialize_git_repo',
                name: 'Initialize Git Repository'
              }
            ]
          }

        ]
      }
    ],
    footer: [
      {
        type: 'footer',
        id: 'footer',
        subitems: [
          {
            type: 'button',
            id: 'button_create',
            text: 'Create'
          }
        ]
      }
    ]
  };

  let view = new GenericWebView(extensionContext, "New Project X");
  view.createPanel(formDefinition);

}

async function generateConsoleApplication () {
}

import * as fs from 'fs';

async function generateStandardApi () {
}

function getWebviewContent () {
  var canvasPath = vscode.Uri.joinPath(mediaFolder, 'canvas.html').fsPath;
  var content = fs.readFileSync(canvasPath, 'utf-8');
  return content;
}

function getWebviewConentNewProject () {
  var canvasPath = vscode.Uri.joinPath(mediaFolder, 'new-project.html').fsPath;
  var content = fs.readFileSync(canvasPath, 'utf-8');
  return content;
}

function getWebviewContentSettings () {
  var canvasPath = vscode.Uri.joinPath(
    mediaFolder,
    'webview-with-tree.html'
  ).fsPath;
  var content = fs.readFileSync(canvasPath, 'utf-8');

  return content;
}

function getWebviewContentExamples () {
  var canvasPath = vscode.Uri.joinPath(
    mediaFolder,
    'webview-with-tree.html'
  ).fsPath;
  var content = fs.readFileSync(canvasPath, 'utf-8');

  return content;
}

async function generateRestApi () {
  const result = await vscode.window.showQuickPick([
    'REST API for ESP IDF HTTP/HTTPS',
    'NuttX REST API',
    'Zephyr REST API',
    'Arduino REST API'
  ]);

  vscode.window.showInformationMessage('Selected ' + result);
}

async function generateAtCommandHandler () {
  const panel = vscode.window.createWebviewPanel(
    'catCoding', // Identifies the type of the webview. Used internally
    'Espressif Wizard', // Title of the panel displayed to the user
    vscode.ViewColumn.One, // Editor column to show the new webview panel in.
    {
      enableScripts: true
      //localResourceRoots: [mediaFolder, vscode.Uri.joinPath(extensionUri, 'node_modules', '@vscode/codicons', 'dist')]
    } // Webview options. More on these later.
  );
}

async function generateTest () {
  const result = await vscode.window.showQuickPick([
    'PyTest - ',
    'NuttX AT Command Handler',
    'Zephyr AT Command Handler',
    'Arduino AT Command Handler'
  ]);

  vscode.window.showInformationMessage('Selected ' + result);
}
