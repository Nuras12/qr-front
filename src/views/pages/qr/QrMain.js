import React, { useState } from 'react'
import { CCol, CContainer, CRow } from '@coreui/react'
import { QrReader } from 'react-qr-reader'
import { api } from 'src/api'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const [data, setData] = useState('')
  const navigate = useNavigate()

  const setQr = async (ticketId) => {
    if (!ticketId) {
      return
    }

    try {
      const res = await api.qrApi.getTicketById(ticketId)
      console.log(res, res.available <= 0, res.available)
      if (res.available <= 0) {
        setData('Данный билет не имеет доступных сканирований')
        return
      }

      navigate(`/qr/choose/${ticketId}`)

      console.log({ res })
    } catch (error) {
      if (error?.response.data.statusCode === 401) {
        navigate('/login')
      }
      setData(error?.response.data.message)
    }
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer className="container-fluid">
        <CRow className="justify-content-center">
          <CCol md={8}>
            <QrReader
              onResult={(result, error) => {
                if (!!result) {
                  setQr(result?.text)
                }

                if (!!error) {
                  // console.info(error)
                }
              }}
              style={{ width: '100%' }}
            />
            <p>{data}</p>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
