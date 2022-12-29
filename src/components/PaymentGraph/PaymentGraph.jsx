import React, { useState } from 'react'
import DateRangePicker from 'react-bootstrap-daterangepicker'
import { withTranslation, useTranslation } from 'react-i18next'
import './PaymentGraph.scss'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-daterangepicker/daterangepicker.css'
import Chart from '../../components/Chart/Chart'
import Loading from '../Loader/Loading'

function PaymentGraph(props) {
  const { t } = useTranslation()
  console.log(props.graph, 'graphgraph')

  const handleEvent = (event, picker) => {
    console.log(picker.startDate, 'dateEvent')
  }





  return (
    <>
      {props.graph && props.graph ? (
        <div className='col-sm-12 col-md-12 col-lg-12 p-0 payment_graph_container'>
          <div className='row ml-2 mr-2'>
            <div className='col-sm-10 col-md-10 col-lg-10 p-0'>
              <p className='mt-2 out_standing_amt_heading'>
                {t('Sales Purchase/ Volume / Payment Comparision')}
              </p>
            </div>
            <div className='col-sm-2 col-md-2 col-lg-2 p-0 text-right'>
              <div className='form_section'>
                <div className='formBox'>
                  <div className='inputBox'>
                    
                    <DateRangePicker
                      onEvent={handleEvent}
                      onCallback={props.handleCallback}
                
                    >
                      <button type='button' className='mt-1 btn btn-primary'>
                        <i class='fa fa-calendar' aria-hidden='true'></i>
                      </button>
                    </DateRangePicker>
                  </div>
                </div>
              </div>
            </div>

            <div className='col-sm-12 col-md-12 col-lg-12 p-0 mb-3'>
              {<Chart graphData={props.graph} />}
            </div>
          </div>
        </div>
      ) : (
        'No Data Found'
      )}
    </>
  )
}

export default withTranslation()(PaymentGraph)
