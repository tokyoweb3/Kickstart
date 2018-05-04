import React, { Component } from 'react';
import web3 from '../../ethereum/web3';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import { Card } from 'semantic-ui-react';

class CampaignShow extends Component {
    state={

    }
    static async getInitialProps(props) {
        //get url token by props.query.address
        const campaign = Campaign(props.query.address);
        const summary = await campaign.methods.getSummary().call();
        return {
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4]
        };
    }

    renderCards() {
        const {
            balance,
            manager,
            minimumContribution,
            requestsCount,
            approversCount
        } = this.props;

        const items = [
            {
                header: manager,
                meta: 'Address of Manager',
                description: 'The manager created this campaign and can create requests to withdraw money.',
                style: { overflowWrap: 'break-word'},
            },
            {
                header: minimumContribution,
                meta: 'Minimum Contribution (wei)',
                description: 'You must contribute at least this much wei to become a contributor.',
                style: { overflowWrap: 'break-word'},
            },
            {
                header: requestsCount,
                meta: 'Number of Requests',
                description: 'A request tries to withdraw money from the contract. Requests must be approved by approvers',
                style: { overflowWrap: 'break-word'},
            },
            {
                header: approversCount,
                meta: 'Numbers of Approvers',
                description: 'Number of people who have already donated to this campaign.',
                style: { overflowWrap: 'break-word'},
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Campaign Balance (ether)',
                description: 'The balance is how much money this campaign has left to spend',
                style: { overflowWrap: 'break-word'},
            },


        ];

        return <Card.Group items={items} />;
    }

    render() {

        return (
            <Layout>
                <h3>Campaign Show</h3>
                {this.renderCards()}
            </Layout>
        );
    }
}

export default CampaignShow;