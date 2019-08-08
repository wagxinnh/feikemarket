let gulp = require('gulp');
let uglify = require('gulp-uglify');
let babel = require('gulp-babel');
let sass = require('gulp-sass');

gulp.task("watchall", async () => {
	gulp.watch('*.html', async () => {
		gulp.src('*.html')
			.pipe(gulp.dest('D:\\phpStudy\\WWW\\autofeikedisk'));
	})

	gulp.watch('js/**/*', async () => {
		gulp.src('js/**/*')
			.pipe(babel({
				presets: ['es2015']
			}))
			.pipe(uglify())
			.pipe(gulp.dest('D:\\phpStudy\\WWW\\autofeikedisk\\js'));
	});
	
	gulp.watch('img/**/*', async () => {
		gulp.src('img/**/*')
			.pipe(gulp.dest('D:\\phpStudy\\WWW\\autofeikedisk\\img'));
	});

	gulp.watch('font/**/*', async () => {
		gulp.src('font/**/*')
			.pipe(gulp.dest('D:\\phpStudy\\WWW\\autofeikedisk\\font'));
	});

	gulp.watch('php/**/*', async () => {
		gulp.src('php/**/*')
			.pipe(gulp.dest('D:\\phpStudy\\WWW\\autofeikedisk\\php'));
	});
	
	gulp.watch('json/**/*', async () => {
		gulp.src('json/**/*')
			.pipe(gulp.dest('D:\\phpStudy\\WWW\\autofeikedisk\\json'));
	});


	gulp.watch('css/**/*', async () => {
		gulp.src('css/**/*')
			.pipe(gulp.dest('D:\\phpStudy\\WWW\\autofeikedisk\\css'));
	});

	gulp.watch('sass/**/*', async ()=>{
	 gulp.src('sass/**/*')
	 .pipe(sass())//把sass里的东西经过编译放到css中
	 .pipe(gulp.dest('D:\\phpStudy\\WWW\\autofeikedisk\\css'));
	});
});