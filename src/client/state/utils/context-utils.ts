export const initDefaultPropsFromContext = () => {
    const isServer = typeof window === 'undefined';
    return {
        isServer,
    };
};
