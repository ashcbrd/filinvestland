const combineTextWithoutCodeTrue = (dataArray: any) => {
    let combinedText = '';

    if (!dataArray?.length || !dataArray) return

    dataArray.forEach((item: any) => {
        if (item.children && item.children.length > 0) {
            const child = item.children[0];
            if (!(child.code === true)) {
                combinedText += ` ${child.text}` || '';
            }
        }
    });

    return combinedText;
};

export default combineTextWithoutCodeTrue;