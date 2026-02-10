
export interface IEnsoPlugin {
  name: string;
  version: string;
  description: string;

  settings: IPluginSettings;
  events: IPluginEvents;
  context: IPluginContextMenu[];
}

export interface IPluginSetting {
  name: string;
  type: "string" | "number" | "boolean";
  default?: any;
  description?: string;
}

export interface IWorkspace {
  uuid: string;
  name: string;
  icon?: string;
  position: number;
}

export interface ISandboxedTab {
  getTitle(): string;
  getIcon(): string;
  getWorkspace(): IWorkspace;
  getPluginData(): any;
  setPluginData(data: any): void;

  close(): void;
  select(): void;
  unload(): void;

  readonly isSelected: boolean;
}

export type IPluginEventKey = "onInit" | "onUnload" | "onTabChange" | "onTabClose" 
                            | "onTabOpen" | "onWorkspaceChange" | "onWorkspaceClose" 
                            | "onWorkspaceOpen" | "onPreferencesChange";

export type IPluginEventProps<T extends IPluginEventKey> = 
    T extends "onInit" ? { }
  : T extends "onUnload" ? { }
  : T extends "onTabChange" ? { tabId: string }
  : T extends "onTabClose" ? { tabId: string }
  : T extends "onTabOpen" ? { tabId: string }
  : T extends "onWorkspaceChange" ? { workspace: IWorkspace }
  : T extends "onWorkspaceClose" ? { workspace: IWorkspace }
  : T extends "onWorkspaceOpen" ? { workspace: IWorkspace }
  : T extends "onPreferencesChange" ? { settings: IPluginSettings }
  : never;

export type IPluginEvent<T extends IPluginEventKey> = (props: IPluginEventProps<T>) => void;
export type IPluginEvents = {
  [K in IPluginEventKey]?: IPluginEvent<K>;
};

export type IPluginContextMenu = {
  type: "tab" | "link" | "toolbar" | "text";
  label: string;
  icon?: string;
  action: () => void;

  get enabled(): boolean;
  set enabled(value: boolean);
};

export type IPluginSettings = IPluginSetting[];
export default IEnsoPlugin;

// API

export interface IEnsoAPI {
  getTabs(): ISandboxedTab[];
  getWorkspaces(): IWorkspace[];

  getSetting(name: string): any;
  setSetting(name: string, value: any): void;

  set plugin(plugin: IEnsoPlugin);
}

declare global {
  interface Window {
    plugins: IEnsoAPI;
  }
}
