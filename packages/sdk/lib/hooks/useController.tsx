import React, { useState } from 'react';
import Modal from 'react-modal';
import { useAnimatedQRCodePlayer } from './useAnimatedQRCodePlayer';
import { useAnimatedQRCodeReader } from './useAnimatedQRCodeReader';

export const useController = (): [
    JSX.Element,
    {
        play: () => void;
        read: () => void;
    },
] => {
    const [visible, setVisible] = useState(false);
    const [mode, setMode] = useState<'read' | 'play'>('play');
    const [AnimatedQRCodePlayer, { play }] = useAnimatedQRCodePlayer();
    const [AnimatedQRCodeReader, { read }] = useAnimatedQRCodeReader();
    const reset = () => {
        setVisible(false);
        setMode('play');
    };
    const element = (
        <div>
            <Modal isOpen={visible}>
                <div>{mode === 'read' ? AnimatedQRCodeReader : AnimatedQRCodePlayer}</div>
            </Modal>
        </div>
    );
    return [
        element,
        {
            play: () => {
                play();
                reset();
                return;
            },
            read: () => {
                read();
                reset();
                return;
            },
        },
    ];
};
