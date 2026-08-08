const nodemailer = require('nodemailer');
const { INITIAL_PRODUCTS } = require('../../src/data');

const productsStore = [...INITIAL_PRODUCTS];
const usersStore = new Map();
const pendingOTPs = new Map();
const ordersStore = [];
let videoSettingsStore = {
  heroVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-fashion-model-in-a-white-dress-walking-41443-large.mp4',
  heroPosterUrl: '/assets/images/mujtaba_video_hero_1786177863771.jpg',
  showcaseVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-fashion-model-in-a-white-dress-walking-41443-large.mp4',
  showcasePosterUrl: '/assets/images/mujtaba_video_hero_1786177863771.jpg',
  showcaseTitle: 'PURE LUXURY • DEFINE YOUR STYLE',
  showcaseSubtitle: 'Watch the official Mujtaba Designer 2026 runway showcase featuring our signature emerald embroidered gown & gold-pinstripe bespoke suit.',
  updatedAt: new Date().toISOString()
};

const createTransporter = () => {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  if (!emailUser || !emailPass) {
    console.warn('Nodemailer credentials not provided via environment variables. Email dispatches will be simulated.');
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailUser,
      pass: emailPass
    }
  });
};

const json = (status, body) => ({
  statusCode: status,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body)
});

const parseBody = (event) => {
  if (!event.body) return {};
  try {
    return JSON.parse(event.body);
  } catch (e) {
    return null;
  }
};

exports.handler = async function (event) {
  const url = new URL(event.rawUrl || event.path, 'https://example.com');
  const path = url.pathname.replace(/\/+$|^\/+/, '');
  const segments = path.split('/');
  const method = event.httpMethod;
  const body = parseBody(event);

  const respond = (status, data) => json(status, data);

  if (path === 'api/settings/video' && method === 'GET') {
    return respond(200, videoSettingsStore);
  }

  if (path === 'api/settings/video' && method === 'PUT') {
    if (!body) return respond(400, { error: 'Invalid JSON body.' });
    const { heroVideoUrl, heroPosterUrl, showcaseVideoUrl, showcasePosterUrl, showcaseTitle, showcaseSubtitle } = body;
    if (heroVideoUrl) videoSettingsStore.heroVideoUrl = heroVideoUrl.trim();
    if (heroPosterUrl) videoSettingsStore.heroPosterUrl = heroPosterUrl.trim();
    if (showcaseVideoUrl) videoSettingsStore.showcaseVideoUrl = showcaseVideoUrl.trim();
    if (showcasePosterUrl) videoSettingsStore.showcasePosterUrl = showcasePosterUrl.trim();
    if (showcaseTitle) videoSettingsStore.showcaseTitle = showcaseTitle.trim();
    if (showcaseSubtitle) videoSettingsStore.showcaseSubtitle = showcaseSubtitle.trim();
    videoSettingsStore.updatedAt = new Date().toISOString();
    return respond(200, { success: true, message: 'Video settings updated successfully!', settings: videoSettingsStore });
  }

  if (path === 'api/auth/send-otp' && method === 'POST') {
    if (!body) return respond(400, { error: 'Invalid JSON body.' });
    const { gmail, firstName, lastName, password } = body;
    if (!gmail || !firstName || !password) {
      return respond(400, { error: 'Gmail, First Name, and Password are required.' });
    }
    const emailKey = gmail.trim().toLowerCase();
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000;
    pendingOTPs.set(emailKey, { code: otpCode, firstName: firstName.trim(), lastName: lastName ? lastName.trim() : '', password, expiresAt });
    console.log(`[OTP GENERATED] Email: ${emailKey} | Code: ${otpCode}`);
    const transporter = createTransporter();
    let emailSent = false;
    let emailErrorMessage = '';
    if (transporter) {
      try {
        await transporter.sendMail({
          from: `"Mujtaba Designer" <${process.env.EMAIL_USER}>`,
          to: emailKey,
          subject: `${otpCode} is your Mujtaba Designer Verification Code`,
          html: `<div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff;"><div style="text-align: center; margin-bottom: 30px;"><h1 style="font-size: 24px; font-weight: 300; letter-spacing: 4px; color: #0f172a; margin: 0;">MUJTABA DESIGNER</h1><p style="font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #b45309; margin-top: 4px;">HAUTE COUTURE • ISLAMABAD & LAHORE</p></div><hr style="border: none; border-top: 1px solid #f1f5f9; margin: 20px 0;" /><p style="font-size: 16px; color: #334155; line-height: 1.6;">Dear <strong>${firstName}</strong>,</p><p style="font-size: 15px; color: #475569; line-height: 1.6;">Thank you for registering with Mujtaba Designer. Please enter the following 6-digit verification code to activate your account:</p><div style="text-align: center; margin: 35px 0;"><span style="display: inline-block; font-size: 32px; font-weight: 700; letter-spacing: 8px; color: #0f172a; background-color: #f8fafc; padding: 16px 32px; border-radius: 6px; border: 1px dashed #cbd5e1;">${otpCode}</span></div><p style="font-size: 13px; color: #94a3b8; text-align: center;">This code will expire in 10 minutes. If you did not request this code, please ignore this email.</p><hr style="border: none; border-top: 1px solid #f1f5f9; margin: 30px 0;" /><p style="font-size: 12px; color: #94a3b8; text-align: center; margin: 0;">© 2026 Mujtaba Designer. All Rights Reserved. Contact Support: 03318858108</p></div>`
        });
        emailSent = true;
      } catch (err) {
        console.error('Nodemailer send OTP error:', err);
        emailErrorMessage = err.message || 'SMTP failed';
      }
    }
    const response = {
      success: true,
      message: emailSent ? `Verification code dispatched to ${emailKey}` : `Verification code generated for ${emailKey}`,
      emailSent,
      emailErrorMessage: emailErrorMessage || undefined
    };
    if (process.env.NODE_ENV !== 'production') response.debugOtp = otpCode;
    return respond(200, response);
  }

  if (path === 'api/auth/verify-otp' && method === 'POST') {
    if (!body) return respond(400, { error: 'Invalid JSON body.' });
    const { gmail, code } = body;
    if (!gmail || !code) return respond(400, { error: 'Gmail and 6-digit OTP code are required.' });
    const emailKey = gmail.trim().toLowerCase();
    const pendingData = pendingOTPs.get(emailKey);
    if (!pendingData) return respond(400, { error: 'No pending verification found for this email. Please request a new code.' });
    if (Date.now() > pendingData.expiresAt) {
      pendingOTPs.delete(emailKey);
      return respond(400, { error: 'Verification code has expired. Please request a new code.' });
    }
    if (pendingData.code !== code.trim()) return respond(400, { error: 'Invalid verification code. Please check your Gmail and try again.' });
    const user = {
      id: `usr-${Date.now()}`,
      gmail: emailKey,
      firstName: pendingData.firstName,
      lastName: pendingData.lastName,
      isVerified: true,
      createdAt: new Date().toISOString()
    };
    usersStore.set(emailKey, { user, password: pendingData.password });
    pendingOTPs.delete(emailKey);
    const token = `token_usr_${Date.now()}_${Math.random().toString(36).substring(2)}`;
    return respond(200, { success: true, message: 'Account verified successfully!', user, token });
  }

  if (path === 'api/auth/login' && method === 'POST') {
    if (!body) return respond(400, { error: 'Invalid JSON body.' });
    const { gmail, password } = body;
    if (!gmail || !password) return respond(400, { error: 'Gmail and password are required.' });
    const emailKey = gmail.trim().toLowerCase();
    const existing = usersStore.get(emailKey);
    if (!existing || existing.password !== password) return respond(401, { error: 'Invalid Gmail address or password.' });
    const token = `token_usr_${Date.now()}_${Math.random().toString(36).substring(2)}`;
    return respond(200, { success: true, message: 'Login successful', user: existing.user, token });
  }

  if (path === 'api/auth/admin-login' && method === 'POST') {
    if (!body) return respond(400, { error: 'Invalid JSON body.' });
    const { email, password } = body;
    const adminEmail = process.env.ADMIN_EMAIL || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    if (email === adminEmail && password === adminPassword) {
      const token = `admin_token_${Date.now()}`;
      return respond(200, { success: true, admin: { email: adminEmail, role: 'admin' }, token });
    }
    return respond(401, { error: 'Invalid Admin credentials.' });
  }

  if (path === 'api/products' && method === 'GET') {
    return respond(200, { products: productsStore });
  }

  if (path === 'api/products' && method === 'POST') {
    if (!body) return respond(400, { error: 'Invalid JSON body.' });
    const { title, description, price, salePrice, category, collection, images, sizes, inStock, isFeatured } = body;
    if (!title || !price || !category) return respond(400, { error: 'Title, price, and category are required.' });
    const newProd = {
      id: `prod-${Date.now()}`,
      title: title.trim(),
      description: description ? description.trim() : '',
      price: Number(price),
      salePrice: salePrice ? Number(salePrice) : undefined,
      category: category.trim(),
      collection: collection ? collection.trim() : undefined,
      images: Array.isArray(images) && images.length > 0 ? images : ['https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800'],
      sizes: Array.isArray(sizes) && sizes.length > 0 ? sizes : ['S', 'M', 'L'],
      inStock: inStock !== undefined ? Boolean(inStock) : true,
      isFeatured: isFeatured !== undefined ? Boolean(isFeatured) : false,
      createdAt: new Date().toISOString()
    };
    productsStore.unshift(newProd);
    return respond(200, { success: true, product: newProd });
  }

  if (segments[0] === 'api' && segments[1] === 'products' && segments[2] && method === 'PUT') {
    if (!body) return respond(400, { error: 'Invalid JSON body.' });
    const id = segments[2];
    const index = productsStore.findIndex(p => p.id === id);
    if (index === -1) return respond(404, { error: 'Product not found.' });
    const current = productsStore[index];
    const updated = Object.assign({}, current, body, {
      id: current.id,
      price: body.price ? Number(body.price) : current.price,
      salePrice: body.salePrice ? Number(body.salePrice) : current.salePrice
    });
    productsStore[index] = updated;
    return respond(200, { success: true, product: updated });
  }

  if (segments[0] === 'api' && segments[1] === 'products' && segments[2] && method === 'DELETE') {
    const id = segments[2];
    const exists = productsStore.some(p => p.id === id);
    if (!exists) return respond(404, { error: 'Product not found.' });
    const remaining = productsStore.filter(p => p.id !== id);
    productsStore.length = 0;
    productsStore.push(...remaining);
    return respond(200, { success: true, message: 'Product deleted successfully.' });
  }

  if (path === 'api/orders' && method === 'POST') {
    if (!body) return respond(400, { error: 'Invalid JSON body.' });
    const { userEmail, userName, phone, address, city, notes, items, totalAmount, paymentMethod } = body;
    if (!userEmail || !items || !items.length || !address || !phone) return respond(400, { error: 'Missing required order fields or items.' });
    const newOrder = {
      id: `ord-${Date.now()}`,
      orderNumber: `MD-${Math.floor(100000 + Math.random() * 900000)}`,
      userEmail: userEmail.trim().toLowerCase(),
      userName: userName ? userName.trim() : 'Valued Customer',
      phone: phone.trim(),
      address: address.trim(),
      city: city ? city.trim() : 'Lahore',
      notes: notes ? notes.trim() : '',
      items,
      totalAmount: Number(totalAmount),
      paymentMethod: paymentMethod || 'cod',
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    ordersStore.unshift(newOrder);
    return respond(200, { success: true, message: 'Order placed successfully! Awaiting Admin CMS confirmation.', order: newOrder });
  }

  if (segments[0] === 'api' && segments[1] === 'orders' && segments[2] === 'my-orders' && method === 'GET') {
    const email = new URLSearchParams(url.search).get('email');
    if (!email) return respond(400, { error: 'User email parameter required.' });
    const myOrders = ordersStore.filter(o => o.userEmail === email.trim().toLowerCase());
    return respond(200, { orders: myOrders });
  }

  if (path === 'api/orders/all' && method === 'GET') {
    return respond(200, { orders: ordersStore });
  }

  if (segments[0] === 'api' && segments[1] === 'orders' && segments[2] && segments[3] === 'status' && method === 'PUT') {
    if (!body) return respond(400, { error: 'Invalid JSON body.' });
    const id = segments[2];
    const { status } = body;
    if (!['Pending', 'Confirmed', 'Cancelled'].includes(status)) return respond(400, { error: 'Invalid status value.' });
    const order = ordersStore.find(o => o.id === id);
    if (!order) return respond(404, { error: 'Order not found.' });
    order.status = status;
    if (status === 'Confirmed') order.confirmedAt = new Date().toISOString();
    const transporter = createTransporter();
    let emailSent = false;
    let emailMessage = '';
    if (status === 'Confirmed' && transporter) {
      try {
        const itemsListHtml = order.items.map(item => `<tr><td style="padding: 12px 8px; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #334155;"><strong>${item.title}</strong><br/><span style="font-size: 12px; color: #64748b;">Size: ${item.size} | Qty: ${item.quantity}</span></td><td style="padding: 12px 8px; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #0f172a; text-align: right; font-weight: 600;">Rs. ${(item.price * item.quantity).toLocaleString()}</td></tr>`).join('');
        await transporter.sendMail({
          from: `"Mujtaba Designer Admin" <${process.env.EMAIL_USER}>`,
          to: order.userEmail,
          subject: `Order Confirmed! ${order.orderNumber} - Mujtaba Designer`,
          html: `<div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 650px; margin: 0 auto; padding: 40px 24px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff;"><div style="text-align: center; margin-bottom: 24px;"><h1 style="font-size: 26px; font-weight: 300; letter-spacing: 4px; color: #0f172a; margin: 0;">MUJTABA DESIGNER</h1><p style="font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #15803d; font-weight: 600; margin-top: 6px;">ORDER CONFIRMED BY ADMIN</p></div><div style="background-color: #f8fafc; padding: 20px; border-radius: 6px; margin-bottom: 24px;"><p style="font-size: 15px; color: #475569; margin: 0; line-height: 1.5;">Great news! Your order <strong>#${order.orderNumber}</strong> has been officially confirmed by our team and is now being prepared for dispatch.</p></div><h3 style="font-size: 14px; letter-spacing: 1.5px; text-transform: uppercase; color: #0f172a; margin-bottom: 12px;">Order Summary</h3><table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;"><thead><tr style="background-color: #f1f5f9;"><th style="padding: 10px 8px; text-align: left; font-size: 12px; color: #475569;">ITEM</th><th style="padding: 10px 8px; text-align: right; font-size: 12px; color: #475569;">TOTAL</th></tr></thead><tbody>${itemsListHtml}</tbody><tfoot><tr><td style="padding: 14px 8px; font-size: 15px; font-weight: 700; color: #0f172a;">Grand Total</td><td style="padding: 14px 8px; font-size: 16px; font-weight: 700; color: #0f172a; text-align: right;">Rs. ${order.totalAmount.toLocaleString()}</td></tr></tfoot></table><div style="border-top: 1px solid #e2e8f0; padding-top: 16px; margin-top: 20px;"><p style="font-size: 13px; color: #475569; margin: 0 0 4px 0;"><strong>Shipping Address:</strong> ${order.address}, ${order.city}</p><p style="font-size: 13px; color: #475569; margin: 0;"><strong>Phone Contact:</strong> ${order.phone}</p></div><hr style="border: none; border-top: 1px solid #e2e8f0; margin: 28px 0;" /><p style="font-size: 12px; color: #94a3b8; text-align: center;">Thank you for shopping with Mujtaba Designer. For inquiries or custom stitching assistance, contact us at 03318858108 or via WhatsApp.</p></div>`
        });
        emailSent = true;
        emailMessage = `Confirmation email dispatched to ${order.userEmail}`;
      } catch (err) {
        console.error('Failed to send order confirmation email:', err);
        emailMessage = `Order status updated to Confirmed, but email dispatch failed: ${err.message || 'SMTP error'}`;
      }
    }
    return respond(200, { success: true, message: `Order status updated to ${status}. ${emailMessage}`, order, emailSent });
  }

  if (path === 'api/health' && method === 'GET') {
    return respond(200, { status: 'ok', brand: 'Mujtaba Designer Store API', time: new Date().toISOString() });
  }

  return respond(404, { error: 'Route not found.' });
};
