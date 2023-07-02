import productSvg from '@/assets/svg/ic_product_linear.svg'
import DigitToMoney from '@/resources/filters/DigitToMoney'
import editSvg from '@/assets/svg/ic_edit.svg'
import TickSvg from '@/assets/svg/ic_tick-square.svg'
import blockSvg from '@/assets/svg/ic_block.svg'
import discountSvg from '@/assets/svg/ic_discount_linear.svg'
import deletetSvg from '@/assets/svg/ic_delete_linear.svg'

import confirmModal from '@/components/Dashboard/modal/confirm.modal.vue'
import discountProductModal from './modals/discountProduct.modal.vue'
export default {
    name: 'product',
    props: {
        data: {
            required: true,
            type: Object
        },
        choosable: {
            type: Boolean,
            default: false
        }
    },
    components: {
        productSvg,
        editSvg,
        TickSvg,
        blockSvg,
        discountSvg,
        deletetSvg,
        confirmModal,
        discountProductModal
    },
    filters: {
        DigitToMoney
    },
    data() {
        return {
            showMore: false,
            showConfirmModal: false,
            showDiscountModal: false,
            moreActions: {
                edit: {
                    icon: editSvg,
                    title: 'ویرایش',
                    action: 'edit'
                },
                block: {
                    icon: blockSvg,
                    title: 'مسدود کردن کالا',
                    action: 'block'
                },
                unblock: {
                    icon: TickSvg,
                    title: 'آزادسازی کالا',
                    action: 'unblock'
                },
                discount: {
                    icon: discountSvg,
                    title: 'تخفیف',
                    action: 'discount'
                },
                delete: {
                    icon: deletetSvg,
                    title: 'حذف',
                    action: 'delete'
                },
            },
            confirmModalData: {
                title: '',
                message: '',
                btnConfirm: '',
                btnCancel: '',
            }
        }
    },
    computed: {
        filterMoreActions() {
            const {
                edit,
                block,
                unblock,
                ...form
            } = this.moreActions
            if (this.data.status === 'block')
                return {
                    edit,
                    unblock,
                    ...form
                }
            else return {
                edit,
                block,
                ...form
            }
        }
    },
    methods: {
        menuItemClicked(item) {
            const handler = {
                edit: this.handleEdit,
                block: this.handleStatus,
                unblock: this.handleStatus,
                discount: this.handleDiscount,
                delete: this.hadnleDelete,
            }

            handler[item.action]();
        },
        handleEdit() {

        },
        handleStatus() {
            this.showConfirmModal = true;
            if (this.data.status === 'block') {
                this.confirmModalData.title = 'آزادسازی کالا'
                this.confirmModalData.message = 'آیا از آزادسازی کالا اطمینان دارید؟'
                this.confirmModalData.btnConfirm = 'آزادسازی'
            } else {
                this.confirmModalData.title = 'مسدودکردن کالا'
                this.confirmModalData.message = 'آیا از مسدودکردن کالا اطمینان دارید؟'
                this.confirmModalData.btnConfirm = 'مسدودکردن'
            }
        },
        handleDiscount() {
            this.showDiscountModal = true
        },
        hadnleDelete() {
            this.showConfirmModal = true;
            this.confirmModalData.title = 'حذف کالا'
            this.confirmModalData.message = 'آیا از حذف کالا اطمینان دارید؟'
            this.confirmModalData.btnConfirm = 'حذف کردن'
        }
    }
}