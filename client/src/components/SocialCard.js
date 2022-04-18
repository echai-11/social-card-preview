import FacebookCard from "./facebook/FacebookCard";
import TwitterCard from "./twitter/TwitterCard";
import { FACEBOOK,TWITTER } from "../config/constants";
import "../styles/socialcard.scss";
export default function SocialCard ({cardType,data}){
    return (
        <div className="social-card">
           {cardType === FACEBOOK && <FacebookCard data={data}/>}
           {cardType === TWITTER && <TwitterCard data={data}/>}
        </div>
    );
}