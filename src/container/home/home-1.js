import React from 'react';
import { connect } from 'react-redux';
import { getKindByUrl } from 'common/js/util';
import OwnComp from './ownComp/ownComp';
import AgentComp from './agentComp/agentComp';
import Saleman from './saleman/saleman';
import CuringComp from './curingComp/curingComp';
import PlatformComp from './platformComp/platformComp';
import Seller from './seller/seller';

@connect(
  state => state.user
)
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cnyAccount: {}
    };
    console.log(this.kind);
  }
  render() {
    const { cnyAccount } = this.state;
    return (
      <div className="home-wrapper">
        {
          this.kind === 'A'
            ? this.props.type === '0'
              ? <AgentComp cnyAccount={cnyAccount} />
              : <Saleman cnyAccount={cnyAccount} />
            : this.kind === 'O'
              ? <OwnComp cnyAccount={cnyAccount} />
              : this.kind === 'M'
                ? <CuringComp cnyAccount={cnyAccount} />
                : this.kind === 'B'
                  ? <Seller cnyAccount={cnyAccount} />
                  : <PlatformComp cnyAccount={cnyAccount} />
        }
      </div>
    );
  }
}
