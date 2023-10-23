import React from 'react'
import { CCol, CContainer, CRow } from '@coreui/react'
import { QrReader } from 'react-qr-reader'
import { api } from 'src/api'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const navigate = useNavigate()

  const setQr = async (txt) => {
    if (!txt) {
      return
    }

    const pattern = /SP(\d{5})E/
    const match = txt.match(pattern)

    if (!match) {
      return navigate('/qr/grey/4')
    }

    const ticketId = match[1]

    try {
      const res = await api.qrApi.getTicketById(ticketId)
      if (res.available <= 0) {
        return navigate('/qr/grey/1')
      }

      return navigate(`/qr/choose/${ticketId}`)
    } catch (error) {
      console.log(error?.response.data.statusCode === 401, '!!!!')

      if (error?.response.data.statusCode === 401) {
        return navigate('/login')
      }

      if (error?.response.data.statusCode === 404) {
        return navigate('/grey/2')
      }

      if (error?.response.data.statusCode === 422) {
        return navigate('/qr/grey/3')
      }

      navigate(`/qr/grey/${error?.response.data.message}`)
    }
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer className="container-fluid">
        <CRow className="justify-content-center">
          <CCol md={8}>
            <QrReader
              constraints={{ facingMode: 'environment' }}
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
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
