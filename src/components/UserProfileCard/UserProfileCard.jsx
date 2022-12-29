import React, { useEffect } from "react";
import { eventActions } from "../../_actions";
import { useDispatch, useSelector } from 'react-redux';
import { withTranslation, useTranslation } from "react-i18next";
import "./UserProfileCard.scss";
import userImage from "../../assets/img/men.jpg";
let countryList = [
    { countryCode: 'TH', countryName: "Thailand" }, { countryCode: 'LK', countryName: "Sri Lanka" },
    { countryCode: 'VN', countryName: "Vietnam" },
    { countryCode: 'KH', countryName: "Cambodia" }
];
function UserProfileCard(props) {
    const { shipToDetails } = props
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const userProfile = props.customerInfo;
    const selectedLangCode = localStorage.getItem('lancode');
    useEffect(() => {

    }, []);
    ////console.log("customerInfo",userProfile)
    const getcountryName = (countryCode) => {
        try {
            let country_name = countryList.find((code) => code.countryCode == countryCode);
            return country_name.countryName;
        }
        catch {
            return "";
        }

    }
    ///console.log('userProfileuserProfile',userProfile);

    const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
  const HeadingFontChange = useSelector((state) => state.headerfontchanger.headerfontchanger);
    return (
        <>
            <div className="user_profile_card">
                {userProfile.customerTierStatusObj !== undefined && null ? <h6 className="user_type">{userProfile.customerTierStatusObj.customerTierStatus}</h6> : ""}
                <div className="row user_profile_section">
                    <div className="col-12">
                        <div className="imgs_sec">
                            <img src={userProfile.customerImage ? userProfile.customerImage : userImage} />
                            <i className="fa fa-camera"></i>
                        </div>
                        <div className="userinfo_sec">
                            <p className="currentYear">{userProfile && userProfile.customerTierStatusObj ? userProfile.customerTierStatusObj.customerTierStatus : ''}</p>
                            <h4>{userProfile.accountName === undefined || null ? "" : 
                            selectedLangCode === 'en' || selectedLangCode === null ? userProfile.accountName : userProfile.accountNameLocal
                            
                            }</h4>
                            <span className="user_no_id" style={{fontSize: `${FontChange}px`}}>{userProfile && userProfile.soldtoNumber ? userProfile.soldtoNumber.replace(/^0+/, '') : ''}</span>
                            <span className="user_address"  style={{fontSize: `${FontChange}px`}}>
                                {/* {userProfile.addressNumber + ' ' + userProfile.districtValue + ' ' + userProfile.salesDistrictValue + ' ' + getcountryName(userProfile.soldtoCountryCode)} */}

                                {shipToDetails && shipToDetails.getShipToDetails
                                    ? shipToDetails.getShipToDetails.shipToName != 'null'
                                        ? selectedLangCode === 'en' || selectedLangCode === null ? shipToDetails.getShipToDetails.shipToName : shipToDetails.getShipToDetails.shipToNameInLocal
                                        : ' '
                                    : ' '}{' '}
                                <br />
                                {shipToDetails && shipToDetails.getShipToDetails
                                    ? shipToDetails.getShipToDetails.address.address != 'null'
                                        ? shipToDetails.getShipToDetails.address.address
                                        : ' '
                                    : ' '}{' '}
                                {shipToDetails && shipToDetails.getShipToDetails
                                    ? shipToDetails.getShipToDetails.address.regionId != 'null'
                                        ? shipToDetails.getShipToDetails.address.regionId
                                        : ' '
                                    : ' '}{' '}
                                {shipToDetails && shipToDetails.getShipToDetails
                                    ? shipToDetails.getShipToDetails.street != 'null'
                                        ? shipToDetails.getShipToDetails.address.street
                                        : ' '
                                    : ' '}{' '}
                                {shipToDetails && shipToDetails.getShipToDetails
                                    ? shipToDetails.getShipToDetails.address.subDistrictId !=
                                        'null'
                                        ? shipToDetails.getShipToDetails.address.subDistrictId
                                        : ' '
                                    : ' '}{' '}
                                {shipToDetails && shipToDetails.getShipToDetails
                                    ? shipToDetails.getShipToDetails.address.districtId !=
                                        'null'
                                        ? shipToDetails.getShipToDetails.address.districtId
                                        : ' '
                                    : ' '}{' '}
                                {shipToDetails && shipToDetails.getShipToDetails
                                    ? shipToDetails.getShipToDetails.address.provinceId !=
                                        'null'
                                        ? selectedLangCode === 'en' || selectedLangCode === null ? shipToDetails.getShipToDetails.address.provinceId : shipToDetails.getShipToDetails.address.provinceInLocalLanguage
                                        : ' '
                                    : ' '}{' '}
                                {shipToDetails && shipToDetails.getShipToDetails
                                    ? shipToDetails.getShipToDetails.address.postalCode !=
                                        'null'
                                        ? shipToDetails.getShipToDetails.address.postalCode
                                        : ' '
                                    : ' '}{' '}
                                {shipToDetails && shipToDetails.getShipToDetails
                        ? 
                        
                        shipToDetails.getShipToDetails.address.countryId != "null" ? 
                        selectedLangCode === 'en' || selectedLangCode === null ?
                        shipToDetails.getShipToDetails.address.countryId  === "TH" ? "Thailand" 
                        : shipToDetails.getShipToDetails.address.postalCode === "VN" ? 'Vietnam' 
                        :shipToDetails.getShipToDetails.address.postalCode === "SL" ? 'Sri lanka' 
                        :shipToDetails.getShipToDetails.address.postalCode === "KH" ? 'Comodiya' 
                        :''
                       
                        :
                        shipToDetails.getShipToDetails.address.countryId  === "TH" ? "ประเทศไทย" 
                        : shipToDetails.getShipToDetails.address.postalCode === "VN" ? 'เวียดนาม' 
                        :shipToDetails.getShipToDetails.address.postalCode === "SL" ? 'ศรีลังกา' 
                        :shipToDetails.getShipToDetails.address.postalCode === "KH" ? 'Comodiya' 
                        :'' : '' : ''
                         
                        
                        
                        }
                            </span>
                        </div>

                        <div className="row">
                            <div className="col-10 details_sec pb-4 pt-3">
                                <div className="row">
                                    <div className="col-4 text-center">
                                        <div className="enquiry1">
                                            <span className="title" style={{fontSize: `${FontChange}px`}}>{t("phoneno.label")}</span>
                                            <span className="value" style={{fontSize: `${FontChange}px`}}>{userProfile.phoneNumber}</span>
                                        </div>

                                    </div>
                                    <div className="col-4 text-center">
                                        <div className="enquiry2">
                                            <span className="title" style={{fontSize: `${FontChange}px`}}>{t("mobileno.label")}</span>
                                            {userProfile.mobileNumber !== '' || userProfile.mobileNumber !== null  ? <span className="value" style={{fontSize: `${FontChange}px`}}>{userProfile.mobileNumber}</span> : ''}
                                        </div>



                                    </div>
                                    <div className="col-4 text-center">
                                        <div className="enquiry3">
                                            <span className="title" style={{fontSize: `${FontChange}px`}}>{t("EmailId.label")}</span>
                                            <span className="value" style={{fontSize: `${FontChange}px`}}>{userProfile.soldtoEmail}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}
export default withTranslation()(UserProfileCard);