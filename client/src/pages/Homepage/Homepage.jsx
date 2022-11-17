import styles from "./Homepage.module.scss";
import TimelineComponent from './components/Timeline/Timeline';

export default function Homepage() {
    return (
        <div className="flex-fill container d-flex flex-column p-20">
            <div className={`card flex-fill d-flex flex-column p-20 mb-20 ${styles.contentCard}`}>
                <TimelineComponent />
            </div>
        </div>
    );
}