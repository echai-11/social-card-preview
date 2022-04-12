import SocialCard from "./SocialCard";
import MetaInfo from "./MetaInfo";
import { FACEBOOK,TWITTER } from "../config/constants";

export default function Preview ({data}){
    return (
        <div>
            <MetaInfo data={data} />
            <SocialCard cardType={FACEBOOK} data={data} />
            <SocialCard cardType={TWITTER} data={data} />
        </div>
    )

}