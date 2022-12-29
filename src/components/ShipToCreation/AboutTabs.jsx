import React from 'react'
import { withTranslation, useTranslation } from 'react-i18next'
import './Shiptocreation.scss'
import Navigate from '../../assets/img/map.svg'
import Graph from './Graph'
import { Link } from 'react-router-dom'

function AboutTabs(props) {
  const { t } = useTranslation()
  const selectedDay = (val) => {
    console.log(val)
  }
  return (
    <>
      <div className='ship_about_tab_section'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-6'>
              {' '}
              <h3>Quick Summary</h3>
            </div>
            <div className='col-6'>
              {' '}
              <p className='customer_tier'>
                <span>Customer Tier : </span> Hunting
              </p>
            </div>
          </div>
          <div className='row'>
            <div className='col-4'>
              <div className='ship_summary'>
                <h5>20</h5>
                <p>Total Stakeholder</p>
              </div>
            </div>
            <div className='col-4'>
              <div className='ship_summary'>
                <h5>05</h5>
                <p>Total Ship To</p>
              </div>
            </div>
            <div className='col-4'>
              <div className='ship_summary'>
                <h5>08</h5>
                <p>Total Retailer</p>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-4'>
              <div className='total_summary'>
                <p>Credit Limit</p>
                <h4>30000 Thai Baht</h4>
              </div>
            </div>
            <div className='col-4'>
              <div className='total_summary'>
                <p>Bg value</p>
                <h4>50000 Thai Baht</h4>
              </div>
            </div>
            <div className='col-4'>
              <div className='total_summary'>
                <p>Total Rewards Points</p>
                <h4>500</h4>
              </div>
            </div>

            <div className='col-4'>
              <div className='total_summary'>
                <p>Total Rewards Points</p>
                <h4>500</h4>
              </div>
            </div>

            <div className='col-4'>
              <div className='total_summary'>
                <p>Total Rewards Points</p>
                <h4>500</h4>
              </div>
            </div>

            <div className='col-4'>
              <div className='total_summary'>
                <p>Total Rewards Points</p>
                <h4>500</h4>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='shipto_update'>
              <p>
                Last Visited on <span>20-11-2020</span> ! by{' '}
                <span>Jhon Smith</span>
              </p>
              <p>
                Last Market movement data captured on <span>20-11-2020</span> !
                by <span>Jhon Smith</span>
              </p>
              <p>
                Last order placed on <span>01st Dec2020</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='ship_about_tab_section'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-6'>
              {' '}
              <h3>Order Summary</h3>
            </div>
          </div>

          <div className='row'>
            <div>
              <Graph />
            </div>
          </div>
        </div>
      </div>

      <div className='ship_about_tab_section'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-6'>
              {' '}
              <h3>Basic Information</h3>
            </div>
          </div>

          <div className='row'>
            <div className='col-4'>
              <div className='total_summary'>
                <p>Corporate Registration</p>
                <h4>TH02CNH02157</h4>
              </div>
            </div>
            <div className='col-4'>
              <div className='total_summary'>
                <p>Commercial Registration</p>
                <h4>TH02CNH02157</h4>
              </div>
            </div>
            <div className='col-4'>
              <div className='total_summary'>
                <p>Tax Number</p>
                <h4>TH02CNH02157</h4>
              </div>
            </div>

            <div className='col-4'>
              <div className='total_summary'>
                <p>Distribution Chanel</p>
                <h4>Agent</h4>
              </div>
            </div>

            <div className='col-4'>
              <div className='total_summary'>
                <p>Terms of payment</p>
                <h4>Credit</h4>
              </div>
            </div>

            <div className='col-4'>
              <div className='total_summary'>
                <p>Contact phone</p>
                <h4>0124 5856443</h4>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='shipto_update'>
              <p>
                <img src={Navigate} /> 1177 pearl Bangkok Building 23rd floor{' '}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='ship_about_tab_section'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-6'>
              {' '}
              <h3>Rewards Point</h3>
            </div>
          </div>

          <div className='row'>
            <div className='col-4'>
              <div className='total_summary'>
                <p>Total Reward Points</p>
                <h4>2512</h4>
              </div>
            </div>
            <div className='col-4'>
              <div className='total_summary'>
                <p>Last Earn Rewards point</p>
                <h4>10</h4>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='shipto_update'>
              <Link to='/'>View Reward Point</Link>
            </div>
          </div>
        </div>
      </div>

      <div className='ship_about_tab_section'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-6'>
              {' '}
              <h3>Market Movement Data</h3>
            </div>
          </div>
          <div className='row'>
            <div className='col-4'>
              <div className='market_data cement_color'>
                <p>SCG Cement</p>
              </div>
            </div>
            <div className='col-4'>
              <div className='market_data thai_color'>
                <p>Thai Cement</p>
              </div>
            </div>
            <div className='col-4'>
              <div className='market_data asia_color'>
                <p>Asia Cement</p>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-4'>
              <div className='total_summary'>
                <p>Market Share</p>
                <h4>40%</h4>
              </div>
            </div>
            <div className='col-4'>
              <div className='total_summary'>
                <p>Numeric Reach</p>
                <h4>20</h4>
              </div>
            </div>
            <div className='col-4'>
              <div className='total_summary'>
                <p>Market price</p>
                <h4>1200 Thai Baht</h4>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='shipto_update'>
              <p>
                Last Visited on <span>20-11-2020</span> ! by{' '}
                <span>Jhon Smith</span>{' '}
                <Link to='' className='text-right'>
                  View Operational Data
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='ship_about_tab_section'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-6'>
              {' '}
              <h3>Visit Information</h3>
            </div>
          </div>

          <div className='row'>
            <div className='shipto_update'>
              <p>
                <span>Visit Objective :</span> NEW PRODUCT LUNCH DISCUSSION
              </p>
              <p>
                <span>Next Step :</span> NEED TO GIVE DEMO ON THE NEXT
              </p>
            </div>
          </div>

          <div className='row'>
            <div className='shipto_update'>
              <p>
                Last Visited on <span>20-11-2020</span> ! by{' '}
                <span>Jhon Smith</span>{' '}
                <Link to='' className='text-right'>
                  View Operational Data
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='ship_about_tab_section'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-6'>
              {' '}
              <h3>Ship to Information</h3>
            </div>
          </div>

          <div className='row'>
            <div className='shipto_update'>
              <p>
                <img src='/static/media/map.ed177449.svg' /> 1177 pearl Bangkok
                Building 23rd floor{' '}
              </p>
            </div>
          </div>

          <div className='row'>
            <div className='shipto_update'>
              <p>
                Last Visited on <span>20-11-2020</span> ! by{' '}
                <span>Jhon Smith</span>{' '}
                <Link to='' className='text-right'>
                  View All Ship to
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='ship_about_tab_section'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-6'>
              {' '}
              <h3>Contact</h3>
            </div>
          </div>

          <div className='row'>
            <div className='col-2'>
              <div className='user_img'>
                <i className='fa fa-user'></i>
              </div>
            </div>
            <div className='col-5'>
              <div className='user_name'>Kumar Gautam</div>
              <div className='user-occuption'>Engineer</div>
            </div>
            <div className='col-5'>
              <div className='retailer-mail'>
                <Link to='mailto:john.dore@gmail.com'>
                  <i class='fa fa-envelope' aria-hidden='true'></i>{' '}
                  john.dore@gmail.com
                </Link>
              </div>
              <div className='retailer-call'>
                <Link to='tel:963664333'>
                  <i class='fa fa-phone' aria-hidden='true'></i> + 91 3434644346
                </Link>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='shipto_update'>
              <p>
                Last Visited on <span>20-11-2020</span> ! by{' '}
                <span>Jhon Smith</span>{' '}
                <Link to='' className='text-right'>
                  View All Stakeholder
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='ship_about_tab_section'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-6'>
              {' '}
              <h3>Cases(23)</h3>
            </div>
          </div>

          <div class='row'>
            <div class='col-4'>
              <div class='ship_summary'>
                <h5>08</h5>
                <p>Open</p>
              </div>
            </div>

            <div class='col-4'>
              <div class='ship_summary'>
                <h5>05</h5>
                <p>Escalated</p>
              </div>
            </div>

            <div class='col-4'>
              <div class='ship_summary'>
                <h5>08</h5>
                <p>Closed</p>
              </div>
            </div>
          </div>

          <div className='row mt-5'>
            <div className='shipto_update'>
              <p>
                Last Visited on <span>20-11-2020</span> ! by{' '}
                <span>Jhon Smith</span>{' '}
                <Link to='' className='text-right'>
                  View All Stakeholder
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='ship_about_tab_section'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-6'>
              {' '}
              <h3>Retailer</h3>
            </div>
          </div>

          <div className='row'>
            <div className='col-4'>
              <div className='retailer_name'>Kumar Cement</div>
            </div>
            <div className='col-4'>
              <div className='retailer-mail'>
                <Link to='mailto:john.dore@gmail.com'>
                  <i class='fa fa-envelope' aria-hidden='true'></i>{' '}
                  john.dore@gmail.com
                </Link>
              </div>
            </div>
            <div className='col-4'>
              <div className='retailer-call'>
                <Link to='tel:963664333'>
                  <i class='fa fa-phone' aria-hidden='true'></i> + 91 3434644346
                </Link>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='shipto_update'>
              <p>
                Last Visited on <span>20-11-2020</span> ! by{' '}
                <span>Jhon Smith</span>{' '}
                <Link to='' className='text-right'>
                  View All Retailer
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default withTranslation()(AboutTabs)
