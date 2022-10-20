// import React, { useState, useLayoutEffect, useRef } from 'react';
// import { View, StyleSheet, Text } from 'react-native';

// export const AdaptiveText = props => {
    
//     const [parentDims, setParentDims] = useState({width: 0, height: 0});
//     const [childDims, setChildDims] = useState({width: 0, height: 0});
//     const [fontSize, setFontSize] = useState(50);

//     useLayoutEffect(() => {
//             console.log({parent: parentDims, child: childDims}, 'new', fontSize);
//             testDims();
//     }, [parentDims, childDims])

//     const testDims = () => {
//         if (childDims.width > parentDims.width || childDims.height > parentDims.height) setFontSize(fontSize - 5);
//     }

//     const updateDims = (event, action) => {
//         console.log(event)
//         action({
//             width: event.nativeEvent.layout.width,
//             height: event.nativeEvent.layout.height
//         })
//     }

//     return(
//         <View style={styles.container} onLayout={(event) => updateDims(event, setParentDims)}>
//             <Text style={{fontSize, whiteSpace: 'nowrap'}} onLayout={(event) => updateDims(event, setChildDims)}>{props.text}</Text>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         maxHeight: 30,
//         borderWidth: 1,
//         borderColor: 'red'
//     }
// });


import React, { useState, useLayoutEffect, useRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';

export const AdaptiveText = props => {
    
    const [parentDims, setParentDims] = useState({width: 0, height: 0});
    const [childDims, setChildDims] = useState({width: 0, height: 0});
    const [fontSize, setFontSize] = useState(100);
    console.log(childDims.height, props.targetHeight, 'testing')

    useLayoutEffect(() => {
            console.log(childDims.height, props.targetHeight, 'testing')
            testDims();
    }, [parentDims, childDims])
3
    const testDims = () => {
        setTimeout(() => {
            console.log(fontSize, 'fontsize')
            if (childDims.height > props.targetHeight) setFontSize(fontSize - 5);
        }, 1500)
    }

    const updateDims = (event, action) => {
        action({
            width: event.nativeEvent.layout.width,
            height: event.nativeEvent.layout.height
        })
    }

    return(
        <View style={styles.container} borderWidth={1} borderColor="#000" onLayout={(event) => updateDims(event, setParentDims)}>
            <Text style={{fontSize, whiteSpace: 'nowrap'}} onLayout={(event) => updateDims(event, setChildDims)}>{props.text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderBottomColor: '#000',
    }
});