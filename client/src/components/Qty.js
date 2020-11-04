import React from 'react';
import styles from './qty.module.css'

const Qty = ({maxCount, count, setCount}) => {
    const onMinusClick = () => {
        if (count > 1 && count <= maxCount) {
            setCount(count - 1)
        }
    }
    const onPlusClick = () => {
        if (count >= 1 && count < maxCount) {
            setCount(count + 1)
        }
    }
    return (
        <div className={styles.qty}>
            <div className={styles.buttonsBarStyle}>
                <button className={`btn btn-secondary ${styles.buttonStyle}`} onClick={onMinusClick}>-</button>
                <p className={styles.countStyle}>{count}</p>
                <button className={`btn btn-secondary ${styles.buttonStyle}`} onClick={onPlusClick}>+</button>
            </div>
        </div>
    );
};

export default Qty;