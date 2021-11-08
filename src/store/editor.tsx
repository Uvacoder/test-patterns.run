import * as React from "react";

import { createTrackedSelector } from "react-tracked";
import create, { State } from "zustand";
import createContext from "zustand/context";
import { persist } from "zustand/middleware";

interface EditorStore extends State {
  title: string;
  source: string;
  updateSource: (source: string) => void;
  reset: () => void;

  size: number;
  increment: () => void;
  decrement: () => void;

  useMonaco: boolean;
  toggleMonaco: (useMonaco?: boolean) => void;
}

const Context = createContext<EditorStore>();

export function createEditorStore(_source: string, _title: string) {
  return create<EditorStore>(
    persist(
      (set, get) => ({
        title: _title,
        source: _source,

        updateSource: (source) => {
          set({ source });
        },
        reset: () => {
          set({ size: 5, source: _source });
        },

        size: 5,
        increment: () => {
          set(({ size }) => ({ size: size + 1 }));
        },
        decrement: () => {
          set(({ size }) => ({
            size: Math.max(Math.min(size - 1, size), 1),
          }));
        },

        useMonaco: true,
        toggleMonaco: (useMonaco = !get().useMonaco) => {
          set({ useMonaco });
        },
      }),
      {
        name: "editor-state",
        whitelist: ["useMonaco"],
        version: 4,
      },
    ),
  );
}

interface EditorProviderProps {
  children: React.ReactNode;
  value: {
    title: string;
    source: string;
  };
}

export function EditorProvider({ children, value: { source, title } }: EditorProviderProps) {
  const createStore = React.useCallback(() => createEditorStore(source, title), [source, title]);

  return (
    <Context.Provider createStore={createStore}>
      {children}
      {/*  */}
    </Context.Provider>
  );
}

export const useEditorStore = Context.useStore;
export const useEditorStoreApi = Context.useStoreApi;
export const useEditor = createTrackedSelector(useEditorStore);
