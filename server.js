
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint للتحقق من تسجيل الدخول وجلب معلومات المستخدم
app.get('/player_api.php', (req, res) => {
    const { username, password, action } = req.query;

    // استجابة طلب تسجيل الدخول الأصلي
    if (!action) {
        return res.json({
            user_info: {
                username: username || "demo",
                password: password || "demo",
                message: "Welcome to Test Server",
                auth: 1,
                status: "Active",
                exp_date: "1773014400",
                is_trial: "0",
                active_cons: "1",
                created_at: "1600000000",
                max_connections: "5",
                allowed_output_formats: ["m3u8", "ts"]
            },
            server_info: {
                url: req.hostname,
                port: "80",
                https_port: "443",
                server_protocol: "https",
                rtmp_port: "8000",
                timezone: "UTC",
                timestamp_now: Math.floor(Date.now() / 1000)
            }
        });
    }

    // استجابة طلب القنوات المباشرة (Live Categories / Streams)
    if (action === 'get_live_categories') {
        return res.json([
            { category_id: "1", category_name: "Demo Channels", parent_id: 0 }
        ]);
    }

    if (action === 'get_live_streams') {
        return res.json([
            {
                num: 1,
                name: "Test Stream (Big Buck Bunny)",
                stream_type: "live",
                stream_id: 1001,
                stream_icon: "",
                epg_channel_id: "",
                added: "1600000000",
                category_id: "1",
                custom_sid: "",
                direct_source: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
            }
        ]);
    }

    return res.json([]);
});

// توجيه رابط البث الفعلي للقناة التجريبية
app.get('/live/:username/:password/:stream_id', (req, res) => {
    res.redirect('https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8');
});

app.listen(PORT, () => {
    console.log(`Xtream demo server running on port ${PORT}`);
});
