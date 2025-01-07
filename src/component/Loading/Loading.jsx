
import { tailspin } from 'ldrs'


import styles from './Loading.module.scss';


function Loading(props) {

    const { 
        size = 60,
        bgOpacity = 0.1,
        speed = 1.75,
        color = 'black'
    } = props;
    

    tailspin.register()


    return (

        <div className={styles.loading}>

            <l-tailspin
                size={size}
                bg-opacity={bgOpacity}
                speed={speed}
                color={color}
            ></l-tailspin>

        </div>
    )
}

export default Loading;

