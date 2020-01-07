/**
 * Displays a widget connected to the Status dApp
 */

import React, {
  useState,
  useContext,
  useEffect,
} from 'react';
import {
  useWeb3Context,
} from 'web3-react';
import {
  Row,
  Col,
  Button,
} from 'reactstrap';

import SnowflakeContext from '../../../../contexts/snowflakeContext';

import Purchase from '../../../../components/purchase';
import LegacyDapp from '../../../../components/legacyDapp';

import {
  getStatus,
} from '../../../../services/utilities';

function StatusWidget() {
  const user = useContext(SnowflakeContext);

  const {
    dapps,
    ethAddress,
  } = user;

  const [status, setStatus] = useState('');

  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [isDappModalOpen, setIsDappModalOpen] = useState(false);

  const statusAddress = '0xc8697fDA750DE0d9eFb5782bBd620E7128CD09Cd';
  const web3 = useWeb3Context();

  useEffect(() => {
    async function getCurrentStatus() {
      if (dapps.includes(statusAddress)) {
        const currentStatus = await getStatus(web3.library, ethAddress);
        setStatus(currentStatus);
      }
    }

    getCurrentStatus();
  }, [dapps]);

  return (
    <div>
      <LegacyDapp
        id={statusAddress}
        title="Status"
        isOpen={isDappModalOpen}
        toggle={() => setIsDappModalOpen(false)}
      />
      <Purchase
        id={statusAddress}
        title="Status"
		price="1"
        isOpen={isPurchaseModalOpen}
        toggle={() => setIsPurchaseModalOpen(false)}
      />
      <Row className="mb-4 no-gutters status">
        <Col>
          <Row>
            <Col>
              <p className="status__title">
                My Status:
              </p>
            </Col>
            <Col>
              {dapps.includes(statusAddress) ? (
                <Button className="status__edit" onClick={() => setIsDappModalOpen(true)}>
                  Edit
                </Button>
              ) : (
                <Button className="status__edit" onClick={() => setIsPurchaseModalOpen(true)}>
                  Get
                </Button>
              )}

            </Col>
          </Row>
          <p className="status__current">
            {status !== '' ? (
              status
            ) : (
              'No status yet!'
            )}
          </p>
        </Col>
      </Row>
    </div>

  );
}

export default StatusWidget;
