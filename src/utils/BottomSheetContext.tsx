import { CustomModal } from '@components';
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { BackHandler } from 'react-native';

interface BottomSheetContextType {
  showBottomSheet: (
    content: ReactNode,
    modalProps?: Partial<React.ComponentProps<typeof CustomModal>>,
  ) => void;
  hideBottomSheet: () => void;
}

const BottomSheetContext = createContext<BottomSheetContextType | undefined>(
  undefined,
);

export const useBottomSheet = () => {
  const context = useContext(BottomSheetContext);
  if (!context)
    throw new Error('useBottomSheet must be used within BottomSheetProvider');
  return context;
};

export const BottomSheetProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState<ReactNode>(null);
  const [modalProps, setModalProps] = useState<
    Partial<React.ComponentProps<typeof CustomModal>>
  >({});

  const showBottomSheet = (
    newContent: ReactNode,
    newModalProps: Partial<React.ComponentProps<typeof CustomModal>> = {},
  ) => {
    setContent(newContent);
    setModalProps(newModalProps);
    setVisible(true);
  };

  const hideBottomSheet = () => {
    setVisible(false);
    setContent(null);
    setModalProps({});
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (visible) {
          hideBottomSheet();
          return true;
        }
        return false;
      },
    );

    return () => backHandler.remove();
  }, [visible]);

  return (
    <BottomSheetContext.Provider value={{ showBottomSheet, hideBottomSheet }}>
      {children}
      <CustomModal visible={visible} onClose={hideBottomSheet} {...modalProps} >
        {content}
      </CustomModal>
    </BottomSheetContext.Provider>
  );
};
