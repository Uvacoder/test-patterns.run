import * as React from "react";

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
  return () =>
    create<EditorStore>(
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
  value: {
    title: string;
    source: string;
  };
}

export const EditorProvider: React.FC<EditorProviderProps> = (props) => {
  const {
    value: { source, title },
    children,
  } = props;

  return (
    <Context.Provider createStore={createEditorStore(source, title)}>
      {children}
    </Context.Provider>
  );
};

export const useEditorStore = Context.useStore;
export const useEditorStoreApi = Context.useStoreApi;
