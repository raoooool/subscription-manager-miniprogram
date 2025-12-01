type CycleValue = 'monthly' | 'quarterly' | 'yearly' | 'custom';

type CycleOption = {
  value: CycleValue;
  label: string;
  description: string;
};

type PageData = {
  name: string;
  amount: string;
  currency: string;
  cycle: CycleValue;
  cycleLabel: string;
  startDate: string;
  nextBilling: string;
  reminderDays: number;
  autopay: boolean;
  notes: string;
  cycleOptions: CycleOption[];
};

const cycleOptions: CycleOption[] = [
  { value: 'monthly', label: '月付', description: '每月一次，最常见' },
  { value: 'quarterly', label: '季付', description: '每 3 个月一次' },
  { value: 'yearly', label: '年付', description: '每年一次，折扣常见' },
  { value: 'custom', label: '自定义', description: '可在后端自定义周期' },
];

const defaultCycle: CycleValue = 'monthly' as CycleValue;
const defaultCycleLabel =
  cycleOptions.find((option) => option.value === defaultCycle)?.label ?? '月付';

Page({
  data: {
    name: '',
    amount: '',
    currency: '¥',
    cycle: defaultCycle,
    cycleLabel: defaultCycleLabel,
    startDate: '',
    nextBilling: '--',
    reminderDays: 3,
    autopay: true,
    notes: '',
    cycleOptions,
  },
  onNameInput(event) {
    this.setData({ name: event.detail.value });
  },
  onAmountInput(event) {
    const cleaned = event.detail.value.replace(/[^\d.]/g, '');
    this.setData({ amount: cleaned });
  },
  onCycleTap(event) {
    const { value } = event.currentTarget.dataset as { value: CycleValue };
    if (value == null) {
      return;
    }
    this.updateCycle(value);
  },
  onDateChange(event) {
    const startDate = event.detail.value as string;
    const nextBilling = this.calculateNextBilling(startDate, this.data.cycle);
    this.setData({ startDate, nextBilling });
  },
  onReminderInput(event) {
    const parsed = Number(event.detail.value);
    const reminderDays = Number.isNaN(parsed) ? 0 : Math.min(30, Math.max(0, Math.floor(parsed)));
    this.setData({ reminderDays });
  },
  onToggleAutopay(event) {
    this.setData({ autopay: event.detail.value });
  },
  onNotesInput(event) {
    this.setData({ notes: event.detail.value });
  },
  onSubmit() {
    const { name, amount, startDate, cycleLabel, nextBilling } = this.data;
    if (name.trim().length === 0) {
      wx.showToast({ title: '请输入订阅名称', icon: 'none' });
      return;
    }
    const numericAmount = Number(amount);
    if (amount === '' || amount === undefined || amount === null || Number.isNaN(numericAmount)) {
      wx.showToast({ title: '请输入正确的金额', icon: 'none' });
      return;
    }
    if (startDate === '') {
      wx.showToast({ title: '请选择起始日期', icon: 'none' });
      return;
    }
    wx.showModal({
      title: '已保存（示例）',
      content: `订阅：${name}\n金额：¥${numericAmount.toFixed(
        2,
      )}\n周期：${cycleLabel}\n下次扣款：${nextBilling}`,
      showCancel: false,
      confirmText: '好的',
    });
  },
  updateCycle(cycle: CycleValue) {
    const cycleLabel = this.getCycleLabel(cycle);
    const nextBilling = this.calculateNextBilling(this.data.startDate, cycle);
    this.setData({ cycle, cycleLabel, nextBilling });
  },
  calculateNextBilling(startDate: string, cycle: CycleValue) {
    if (startDate === '') {
      return '--';
    }
    const base = new Date(`${startDate}T00:00:00`);
    if (Number.isNaN(base.getTime())) {
      return '--';
    }
    const next = new Date(base);
    switch (cycle) {
      case 'monthly':
        next.setMonth(next.getMonth() + 1);
        break;
      case 'quarterly':
        next.setMonth(next.getMonth() + 3);
        break;
      case 'yearly':
        next.setFullYear(next.getFullYear() + 1);
        break;
      case 'custom':
        next.setDate(next.getDate() + 30);
        break;
      default:
        break;
    }
    return this.formatDate(next);
  },
  getCycleLabel(cycle: CycleValue) {
    return this.data.cycleOptions.find((option) => option.value === cycle)?.label ?? '自定义';
  },
  formatDate(date: Date) {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  },
});
