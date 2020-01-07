/* eslint-disable */
/* This file contains code from the "legacy" era, it needs to be re-written */

import React, { useState } from 'react'
import { TextField, Typography, Button } from '@material-ui/core'

import { useWeb3Context } from 'web3-react'
import { useGenericContract, useNamedContract, useAccountEffect } from '../../common/hooks'
import TransactionButton from '../../common/TransactionButton'

import ABI from './abi';

export default function Status ( props ) {
  const context = useWeb3Context()
  const [currentStatus, setCurrentStatus]  = useState('')
  const [newStatus, setNewStatus]  = useState('')

  const [lookupHydroId, setLookupHydroId]  = useState('')
  const [lookupStatus, setLookupStatus]  = useState('')

  const clientRaindropContract = useNamedContract('clientRaindrop')
  const statusContract = useGenericContract('0xc8697fDA750DE0d9eFb5782bBd620E7128CD09Cd', ABI)
  useAccountEffect(() => {
    statusContract.methods.getStatus(props.ein).call().then(status => setCurrentStatus(status))
  })

  function checkStatus () {
    clientRaindropContract.methods["getDetails(string)"](lookupHydroId).call()
      .then(result => {
        statusContract.methods.getStatus(result.ein).call()
          .then(result => {
            result === '' ? setLookupStatus('The given Hydro ID has not set a status yet.') : setLookupStatus(result)
          })
      })
      .catch(() => {
        setLookupStatus('The given Hydro ID does not exist.')
      })
  }

return (
    <div>
      <Typography variant='h2' gutterBottom align="center" color="textPrimary">
        {currentStatus}
      </Typography>

      <TextField
        label="New Status"
        helperText="This will be public."
        margin="normal"
        value={newStatus}
        onChange={e => setNewStatus(e.target.value)}
        fullWidth
      />

      <TransactionButton
        readyText='Set Status'
        method={() => statusContract.methods.setStatus(newStatus)}

      />

      <hr style={{marginTop: 30, marginBottom: 30}} />

      <Typography variant='h2' gutterBottom align="center" color="textPrimary">
        {lookupStatus}
      </Typography>

      <TextField
        label="Hydro Id"
        helperText="View a Hydro ID's status."
        margin="normal"
        value={lookupHydroId}
        onChange={e => setLookupHydroId(e.target.value)}
        fullWidth
      />
      <Button variant='contained' color='primary' onClick={checkStatus}>
        Look Up
      </Button>
    </div>
  )
}
