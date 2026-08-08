import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Truck, Phone, MapPin, RefreshCw, Lock } from 'lucide-react';
import { CartItem, User, Order } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  user: User | null;
  onOrderPlaced: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  user,
  onOrderPlaced,
}) => {
  if (!isOpen || !user) return null;

  const [phone, setPhone] = useState('03318858108');
  const [address, setAddress] = useState('House 14-B, Block H, Gulberg III');
  const [city, setCity] = useState('Lahore');
  const [notes, setNotes] = useState('Please handle with care. Require custom stitching inspection.');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card'>('cod');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  const totalAmount = cart.reduce(
    (sum, item) => sum + (item.product.salePrice || item.product.price) * item.quantity,
    0
  );

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!phone || !address || !city) {
      setErrorMsg('Please complete all required shipping fields.');
      return;
    }

    setLoading(true);

    try {
      const orderItems = cart.map((item) => ({
        productId: item.product.id,
        title: item.product.title,
        image: item.product.images[0] || '',
        price: item.product.salePrice || item.product.price,
        size: item.selectedSize,
        quantity: item.quantity,
      }));

      const payload = {
        userEmail: user.gmail,
        userName: `${user.firstName} ${user.lastName || ''}`.trim(),
        phone,
        address,
        city,
        notes,
        items: orderItems,
        totalAmount,
        paymentMethod,
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { parseJSONSafe } = await import('../utils/response');
      const data = await parseJSONSafe(res);

      if (!res.ok) {
        throw new Error((data && data.error) || 'Failed to place order.');
      }

      setPlacedOrder(data?.order);
      if (data?.order) onOrderPlaced(data.order);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error processing order.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white rounded-none shadow-2xl border border-stone-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex justify-between items-center border-b border-slate-800">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-amber-400 block mb-0.5">
              MUJTABA DESIGNER • CHECKOUT
            </span>
            <h3 className="font-serif text-xl font-light">Complete Luxury Order</h3>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {placedOrder ? (
          /* Order Confirmation Received Screen */
          <div className="p-8 text-center space-y-4 overflow-y-auto">
            <div className="w-16 h-16 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h2 className="font-serif text-2xl font-bold text-slate-900">
              Order Received! Pending Admin CMS Confirmation
            </h2>

            <div className="p-4 bg-amber-50 border border-amber-200 text-left text-xs space-y-1.5 text-amber-950">
              <p>
                <strong>Order Number:</strong> #{placedOrder.orderNumber}
              </p>
              <p>
                <strong>Status:</strong> <span className="bg-amber-200 px-2 py-0.5 font-bold uppercase text-[10px]">Pending Confirmation</span>
              </p>
              <p>
                <strong>Customer Gmail:</strong> {placedOrder.userEmail}
              </p>
              <p>
                <strong>Total Amount:</strong> Rs. {placedOrder.totalAmount.toLocaleString()}
              </p>
              <p className="text-stone-600 pt-1">
                Your order has been logged into our Admin CMS. Once confirmed by our boutique team, an automated dispatch email will be sent to <strong>{placedOrder.userEmail}</strong>.
              </p>
            </div>

            <div className="pt-4 flex justify-center gap-4">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-slate-900 text-white font-bold text-xs uppercase tracking-widest hover:bg-amber-800"
              >
                Return to Store
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmitOrder} className="p-6 overflow-y-auto space-y-5">
            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs">
                {errorMsg}
              </div>
            )}

            {/* Account Info */}
            <div className="p-3 bg-stone-50 border border-stone-200 text-xs flex justify-between items-center">
              <div>
                <span className="text-stone-500 block text-[10px] uppercase font-bold">Logged In Account:</span>
                <span className="font-semibold text-slate-900">{user.firstName} {user.lastName} ({user.gmail})</span>
              </div>
              <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 text-[10px] font-bold uppercase">
                Verified
              </span>
            </div>

            {/* Shipping Details */}
            <div className="space-y-3">
              <h4 className="font-serif text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-stone-200 pb-1.5 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-800" /> Shipping & Delivery Information
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                    Contact Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 focus:outline-none focus:border-amber-800"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 focus:outline-none focus:border-amber-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                  Full Delivery Address *
                </label>
                <textarea
                  rows={2}
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-stone-300 focus:outline-none focus:border-amber-800"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                  Order Notes / Custom Stitching Instructions
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-stone-300 focus:outline-none focus:border-amber-800"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-2">
              <h4 className="font-serif text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-stone-200 pb-1.5">
                Payment Method
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <label
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 border text-xs cursor-pointer flex items-center justify-between ${
                    paymentMethod === 'cod' ? 'border-amber-800 bg-amber-50/60 font-bold' : 'border-stone-200'
                  }`}
                >
                  <span>Cash on Delivery (COD)</span>
                  <input type="radio" name="payment" checked={paymentMethod === 'cod'} onChange={() => {}} />
                </label>

                <label
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 border text-xs cursor-pointer flex items-center justify-between ${
                    paymentMethod === 'card' ? 'border-amber-800 bg-amber-50/60 font-bold' : 'border-stone-200'
                  }`}
                >
                  <span>Online Credit / Debit Card</span>
                  <input type="radio" name="payment" checked={paymentMethod === 'card'} onChange={() => {}} />
                </label>
              </div>
            </div>

            {/* Order Summary Box */}
            <div className="p-4 bg-stone-50 border border-stone-200 space-y-1 text-xs">
              <div className="flex justify-between">
                <span>Total Items:</span>
                <span className="font-semibold">{cart.reduce((a, b) => a + b.quantity, 0)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-slate-900 pt-1 border-t border-stone-200">
                <span>Grand Total:</span>
                <span className="text-amber-900">Rs. {totalAmount.toLocaleString()}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-slate-900 hover:bg-amber-800 text-white font-bold text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Confirm Order (Submit to CMS)'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
