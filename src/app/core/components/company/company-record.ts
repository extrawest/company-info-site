import { GoogleChartService } from '../../../shared/services/google-chart.service';

export class CompanyRecord {
  id: number;
  founders = [];
  foundersRawData = [];
  tabs = [];
  schema;

  isShowAllFounders: boolean;
  isShowChart: boolean;
  chart;
  foundersPercentageData = [];
  colors = [];
  chartPercentageValue: number;
  companyData;

  constructor(
    id: number,
    companyData: any,
    private _googleChartsService: GoogleChartService
  ) {
    this.id = id;
    this.companyData = companyData;
    this.chartPercentageValue = 0;
    this._getCompanyInfo();
  }

  showMoreLess() {
    this.isShowAllFounders = !this.isShowAllFounders;
  }

  selectChartHandler(selectedItem) {
    let selectedItemIndex;
    this._unselectAllElementsInFoundersList();
    if (selectedItem[0]) {
      selectedItemIndex = selectedItem[0].row;
      this._selectElementInFoundersList(selectedItemIndex);
    }
  }

  private _getCompanyInfo() {
    this._getFoundersData();
    this._setSchema();
    this._setTabs();
  }

  private _getFoundersRawData() {
    for (const raw of this.companyData.n_founders.raw_data) {
      this.foundersRawData.push(raw);
    }
  }

  private _getFoundersData() {
    if (!this.companyData.n_founders) {
      return;
    }
    for (const founder of this.companyData.n_founders.data) {
      const founderRecord = {
        name: founder.name,
        deposit: founder.deposit,
        type: founder.type
      };
      this.founders.push(founderRecord);
    }
    this._getFoundersRawData();
    this._calculateFoundersDepositsPercent();
    this._configureFoundersChart();
  }

  private _configureFoundersChart() {
    if (this.founders.length > 10) {
      this.isShowChart = false;
      return;
    }
    this.isShowChart = true;
    this.colors = this._googleChartsService.getColorPalette();
    const chartsSlicesColorPalette = this._googleChartsService.getColoredSlicesConfig(
      this.colors
    );
    this.chart = new Object({
      title: '',
      type: 'PieChart',
      data: this.foundersPercentageData,
      columnNames: ['Член організації', 'Відсотки'],
      options: {
        pieHole: 0.6,
        tooltip: { trigger: 'none' },
        legend: 'none',
        slices: chartsSlicesColorPalette,
        pieSliceText: 'none',
        chartArea: {
          width: '100%',
          height: '90%'
        }
      },
      width: 300,
      height: 300
    });
  }

  private _updatePercentageLabelValue(index: number) {
    this.chartPercentageValue = this.foundersPercentageData[index][1];
  }

  private _unselectAllElementsInFoundersList() {
    this.chartPercentageValue = 0;
    const listId = 'founders__list_' + this.id;
    const listHolder = document.getElementById(listId);
    const element = listHolder.getElementsByClassName(
      'founders__line_selected'
    )[0];
    if (element) {
      element.classList.remove('founders__line_selected');
    }
  }

  private _selectElementInFoundersList(index: number) {
    const listId = 'founders__list_' + this.id;
    if (index >= 5) {
      this.isShowAllFounders = true;
    }
    const listHolder = document.getElementById(listId);
    const foundersLines = listHolder.getElementsByClassName('founders__line');
    if (foundersLines[index]) {
      foundersLines[index].classList.add('founders__line_selected');
      this._updatePercentageLabelValue(index);
    }
  }

  private _calculateFoundersDepositsPercent() {
    let totalDeposit = 0;
    for (const founder of this.founders) {
      totalDeposit += +founder.deposit;
    }
    for (const founder of this.founders) {
      const line = [];
      let percent;
      line.push(founder.name);
      if (totalDeposit === 0) {
        percent = 100 / this.founders.length;
      } else {
        percent = (founder.deposit * 100) / totalDeposit;
      }
      line.push(Math.floor(percent));
      this.foundersPercentageData.push(line);
    }
    this.foundersPercentageData.sort(this._sortFoundesByPercentage);
  }

  private _setSchema() {
    this.schema = {
      '@context': 'http://schema.org',
      '@type': 'Organization',
      url: `https://companyinfo.in.ua/company/${this.companyData.edrpou}`,
      founder: `${this.companyData.boss}`,
      name: `${this.companyData.shortname}`,
      location: {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          streetAddress: `${this.companyData.address}`
        }
      },
      legalName: `${this.companyData.name}`
    };
  }

  private _setTabs() {
    this.tabs = [
      {
        header: 'ЕДРПОУ',
        body: this.companyData.edrpou,
        class: 'company-info short-title inline-tab-edrpou'
      },
      {
        header: 'Коротка назва',
        body: this.companyData.shortname,
        class: 'company-info short-title'
      },
      {
        header: 'Голова',
        body: this.companyData.boss,
        class: 'company-info company-info__owner-name'
      },
      {
        header: 'Види діяльності',
        body: this.companyData.kved,
        class: 'company-info activities'
      },
      {
        header: 'Місцезнаходження реєстраційної справи',
        body: this.companyData.address,
        class: 'company-info company-info__owner-name place-registration'
      }
    ];
  }

  private _sortFoundesByPercentage(a, b) {
    if (a[1] > b[1]) {
      return -1;
    }
    if (a[1] < b[1]) {
      return 1;
    }
    return 0;
  }
}
