import React, { useState } from 'react';
import Modal from 'react-modal';
import { useAnimatedQRCodePlayer } from './useAnimatedQRCodePlayer';
import { useAnimatedQRCodeReader } from './useAnimatedQRCodeReader';
import { Play, Read } from '../types';

export const useController = (): [
    JSX.Element,
    {
        play: Play;
        read: Read;
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
            play: async (
                data: string,
                options?: {
                    refreshSpeed?: number;
                    size?: number;
                },
            ) => {
                await play(data, options);
                reset();
                return;
            },
            read: async () => {
                const result = await read();
                reset();
                return result;
            },
        },
    ];
};
