import SocialCard from "./SocialCard";
import MetaTable from "./MetaTable";
import { FACEBOOK,TWITTER } from "../config/constants";

export default function Preview ({data}){
    return (
        <div className="preview" data-testid="preview">
            <MetaTable data={data} />
            <div className="preview__social-cards">
                <SocialCard cardType={FACEBOOK} data={data} />
                <SocialCard cardType={TWITTER} data={data} />
            </div>
        </div>
    )

}